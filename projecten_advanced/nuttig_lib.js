// JavaScript Library

/*************** DOM FUNCTIES ***************/

function leegNode(objNode) {
    /* verwijder alle inhoud/children van een node
    @ objNode: node, verplicht, de node die geleegd wordt
     */

    while(objNode.hasChildNodes()){
        objNode.removeChild(objNode.firstChild)
    }
}

/*********************** Datum, tijd functie ******************/

//globale datum objecten te gebruiken in je pagina
var vandaag = new Date();
var huidigeDag = vandaag.getDate(); // dag van de maand
var huidigeWeekDag = vandaag.getDay(); // weekdag
var huidigeMaand = vandaag.getMonth();
var huidigJaar = vandaag.getFullYear();





function getVandaagStr() {
    // returnt een lokale datumtijdstring

    var strNu = "Momenteel: " + vandaag.toLocaleDateString() + ", ";
    strNu += vandaag.toLocaleTimeString();
    return strNu;
}

function isSchrikkeljaar(jaar){
    /* test voor schrikkeljaar
    jaar: number, verplicht
    return: boolean
    */

    eindwaarde=false;

    if (!isNaN(jaar)) {
        if(jaar%4===0){
            eindwaarde=true;
            if(jaar%100===0) {
                eindwaarde=false;
                if(jaar%400===0) {
                    eindwaarde=true;
                }
            }
        }
    }

    return eindwaarde;

}

//------ Date arrays *****/

//dagen volgens getDay() volgorde

var arrWeekdagen = new Array('zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag');

//vervang feb dagen voor een schrikkeljaar

var arrMaanden = new Array(['januari',31], ['februari',28], ['maart',31], ['april',30], ['mei',31], ['juni',31],
    ['juli',31], ['augustus',31], ['september',30], ['oktober',31], ['november',30], ['december',31]);


/*************** cookies ********************/

function setCookie(naam,waarde,dagen) {
    /* plaatst een cookie
    naam: cookienaam
    waarde de inhoud van het cookie
    dagen: optioneel, het aantal dagen voor de cookie vervalt - indien afwezig - session cookie
     */

    var verval = "";

    if (dagen) {
        //vandaag blobaal boven deze lib;

        var vervaldatum = new Date(vandaag.getTime()+dagen*24*60*60*1000);
        verval = vervaldatum.toUTCString();
    }

    document.cookie = naam + "=" + waarde + ";expires=" + verval;
}

//------

function getCookie(naam) {
    /* leest een cookie

    @naam: cookienaam
     */

    var zoek = naam + "=";

    if (document.cookie.length>0){
        var begin = document.cookie.indexOf(zoek);

        if (begin!=-1){
            begin += zoek.length;

            var einde = document.cookie.indexOf(";", begin);

            if (einde==-1) {
                einde = document.cookie.length;
            }

            return document.cookie.substring(begin,einde);



        }
    }
}

function clearCookie(naam){
    /*
    verwijdert een cookie

    @naam: naam van cookie
     */

    setCookie(naam,"",-1);
}

function getElementsByClassName(classname, startElement) {
    /* zoekt elementen van een bepaalde CSS class
    @classname: string, verplicht, de gezochte class
    @startElement: DOM element, optioneel, om de zoektocht in te korten anders doorloopt alle elementen

    return: collection (array van nodes
     */

    if (classname && classname!="") {

        let eBegin  = startElement || document;
        let a = [];
        let reg = new RegExp('\\b' + classname + '\\b');
        let els = eBegin.getElementsByTagName("*");
        let l = els.length;


        for (let i=0; i<l;i++) {
            if(reg.test(els[i].className)) {
                a.push(els[i]);
            }
        }

        return a;
    }
    else {
        throw new Error('argument classNAme verplicht')
    }
}

function addEvent(obj, type, fn) {
    if (obj.attachEvent) {
        obj['e' +type+fn] = fn;
        obj[type+fn] = function(){obj['e'+type+fn]( window.event);}
        obj.attachEvent('on'+type,obj[type+fn]);

    } else
        obj.addEventListener(type,fn,false);
}

//----

function removeEvent(obj,type,fn) {
    if (obj.detachEvent) {
        obj.detachEvent('on'+type,obj[type+fn]);
        obj[type+fn] = null;
    } else {
        obj.removeEventListener(type,fn,false);
    }
}

function overschrijf(optObj, setObj) {
    /*
    Overschrijf alle properties van setObj met optObj, recursif
    @optObj - Object, de doorgegeven opties
    @setObj - Object, het te wijzigen settingsobject, nodig vr recursie
     */

    if (optObj && setObj) {

        for(let key in optObj) {
            if(typeof(optObj[key]) === "object" && !Object.prototype.toString.call(optObj[key]) === '[object Array]'){
                //enkel voor zuivere objecten, geen array
                setObj[key] = setObj[key] || {}; // indien afwezig - leeg object
            }
            else {
                setObj[key] = optObj[key];
            }
        }
    } else {throw new Error('overschrijf: argumenten tekort');}
}

//+++ El class constructor +++++++++++++++++++++

function El(opties) {
    /*
    HTML element constructor
    dependency: overschrijf(), addEvent, removeEvent in nuttig_lib
    @opties: object, optioneel, kan bevatten als props
    -element : string, de tagname, default div
    -style: object, voor het style attrib, dus inline stylerules als props van het object
    -attribs : Object, alle andere attribs als props van het object, met uitzondering van CLASS, dat wordt apart
    meegegeven
    -cssClass: Array van Strings, één of meerdere class waarden
    -event: Array van objecten, met als props type(event) en fn(eventhandler)
     */

    let defaultSettings = {
        element: "div",
        style: {},
        attribs:{},
        events: {}
    };

    var opties = opties || {};
    var settings = defaultSettings;

    // opties instellen
    overschrijf(opties, settings); // nuttig_lib functie

    // elementen aanmaken
    let e = document.createElement(settings.element);

    //settings toepassen

    //attributen, uitgezonder class en style
    for(let key in settings.attribs) {
        let sleutel = key.toString();
        if(sleutel!="class"||sleutel!="style") {
            e.setAttribute(sleutel, settings.attribs[key]);
        }
    }

    //CSS class
    if(settings.cssClass) {
        e.cssKlasse('add',settings.cssClass)
    }

    //inline style

    let styleRules = ""; // CSS tekst opbouwen uit settings.style

    for (let key in settings.style) {
        styleRules+=key+":"+settings.style[key]+";";
    }
    e.setAttribute("style",styleRules);

    //event handlers koppeling volgens John Resig methods

    for(let i=0;i<settings.events.length;i++) {
        addEvent(e,settings.events[i].type,settings.events[i].fn)
    }

    return e;

}

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++AUGMENTATION+++++++++++++++++++++++++++++++++++++++++++++++++ */

Element.prototype.cssKlasse = function(actie, cssClass) {
    /*
    Augmentation van Element = geldige dom node, geen eigne object
    method om css class tokens toe te voegen of te verwijderen aan een element bv element.cssKlasse('add','groen')

    @actie - string, verplicht, de handeling "add" of "remove"
    @cssClass - array van strings, minstens één item

    vb mijnDiv.cssKlass("add",["rood","belangrijk"])
     */

    if(actie && cssClass && Object.prototype.toString.call(cssClass) === '[object Array]') {
        // huidige waarde van CLASS, mogelijk undefined indien geen attrib

        let klassTekst = this.className;
        let regs = [];

        for(let i=0; i<cssClass.length;i++) {
            regs[i] = new RegExp('\\b'+cssClass[i]+'\\b');
        }

        let sp = (klassTekst=="")?"":" ";

        switch (actie) {
            case "add":
                for(let i = 0; i<regs.length;i++) {
                    if(i>0) { sp =" "}
                    if(regs[i].test(klassTekst)==false){
                        this.className += sp + cssClass[i];
                    }
                }
                break;

            case "remove":
                for(let i = 0; i<cssClass.length;i++) {
                    let vervangTekst = klassTekst.match(' '+cssClass[i])?' '+ cssClass[i]:cssClass[i];
                    this.className = Element.className.replace(vervangTekst,'');
                }
                break;

            default:
                throw new Error ('cssKlass: ongekende actie');
        } // einde switch

        return Element;
    } else {
        throw new Error ('cssKlasse: foutieve argumenten');
    }

};

Array.prototype.transpose = function() {
    /* maakt van rijen kollommen en kollommen van rijen 2d array
     @array = 2 dimensionale array;
     */

    // controle als het een 2dimensionele array is
    for (let i=0;i<this.length;i++) {
        if(this[i].constructor === Array) {
            console.log("ja");
        } else {
            return console.log("Array niet multidimensioneel, code afgebroken");
        }
    }


    // breedte
    let b = this.length;

    // hoogte
    let h =  this[0].length;


    // output array
    t = [];


    for (let i = 0; i < h; i++) {


        t[i] = [];


        for (let j = 0; j < b; j++) {


            t[i][j] = this[j][i];
        }
    }

    return t;

    /*for (let i = 0; i<this.length;i++) {
        console.log(this[i][0]);


    }*/


};