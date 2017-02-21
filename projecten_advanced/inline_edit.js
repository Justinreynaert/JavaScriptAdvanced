/*
INLINE EDIT.JS
VOOR PROFIEL.HTML

DEPENDENCIES - NUTTIG, AJAXHANDLER, JSONPARSE

2 FUNCTIONALITEITEN

-elementen met het CLASS attribuut 'makeover' kunnen ter plaatste gewijzigd worden
-gewijzigde waarden worden vai een ajaxcall nr de db geschreven
 */

let makeOver = function() {
    const ajax_base_url = "ajax_profiel_data.php"; // url voor data
    let img_base_url = ""; // base url for images
    let plekjes = []; // alle elementen met de class "makeover"
    let editStapel = {}; //object: stack van alle OP DIT MOMENT WIJZIGENDE ELEMENTEN

    function registreer() {
        /*
        event registratie voor alle elementen die de class "makeover" hebben
         */

        plekjes = getElementsByClassName("makeover");
        for (let i =0; i<plekjes.length; i++) {
           addEvent(plekjes[i],"click", makeOver.edit);

            }
        }

    function tekstWijzigbaar(el) {
        /*
        zet inhoud element in een editBox met knoppen, enkel voor non-Empty elementen: innerHTML
        @el - dom element, verplicht
         */

        let el_orig_id = el.id; // original ID
        let el_id = maakId(); // uniek tijdgetal = miliseconden
        let t = el.innerHTML; // inhoud
        let t_l = t.length; // aantal chars

        //inhoud toevoegen aan editStapel om te kunnen herstellen

        editStapel[el_id] = {
            "el":el,
            "tekst":t,
            "orig_id":el_orig_id
        };

        console.log(editStapel);

        let editBox_type = (t_l>50)?"textArea":"input";
        let editBoxOptions = {
            id: el_id,
            type: editBox_type,
            waarde: t
        };

        el.innerHTML =""; // inhoudlegen
        el.parentNode.insertBefore(maakEditBox(editBoxOptions), el.nextSibling);
        // ditbox eronder als eerstvolgende child van de parent

    }

    function beeldWijzigbaar(el) {
        /*
         @el - dom element, verplicht - IMG
         */
        if (soortEl(el) == "img") {

            let el_orig_id = el.id; // original ID
            let el_id = maakId(); // uniek tijdgetal = miliseconden
            let t = el.innerHTML; // inhoud
            let t_l = t.length; // aantal chars
            let source = el.src; //src waarde, volledig:

            let posLaatsteSlash = source.lastIndexOf("/");
            let bestand = source.substring(posLaatsteSlash);

            //console.log(bestand);


            //inhoud toevoegen aan editStapel om te kunnen herstellen

            editStapel[el_id] = {
                "el":el,
                "tekst":t,
                "orig_id":el_orig_id
            };

            //console.log(editStapel);

            let editBox_type = (t_l>50)?"textArea":"input";
            let editBoxOptions = {
                id: el_id,
                type: editBox_type,
                waarde: t
            };

        el.innerHTML =""; // inhoudlegen
        el.parentNode.insertBefore(maakEditBox(editBoxOptions), el.nextSibling);
        // ditbox eronder als eerstvolgende child van de parent
        }
        else {
            throw new Error('deze functie kan enkel gebruikt worden op IMG elementen')
        }

    }

    function maakId() {
        //genereet een uniek id
        let d = new Date();
        return d.getTime(); // milliseconden
    }

    function maakEditBox(opties) {
        /*
        return een veld en een save en een restore knop
        @opties object, optioneel, bevat de nodig informatie om alles aan te maken
         */

        // defaultwaarden vr functie

        let settings = {
            id:"",
            type:"input",
            waarde:""
        };

        settings = opties || settings; // overschrijf default

        //instellingen voor de "editBox" elementen

        let eVeldInputOpties = {
            element: "input",
            cssClass: ["eVeld"],
            attribs: {type:"text", id:"edit_"+settings.id}
        };

        let eVeldTextAreaOpties ={
            element: "textarea",
            cssClass: ["eVeld"],
            attribts: {id: "edit_"+settings.id}
        };

        let saveKnopOpties = {
            element: "button",
            cssClass: ["saveKnop"],
            attribs: {type:"button",id:"save_"+settings.id,value:"save"},
            events: [{type:"click",fn:makeOver.save}]
        };

        let restoreKnopOpties = {
            element: "button",
            cssClass: ["restoreKnop"],
            attribs: {type:"button",id:"save_"+settings.id,value:"restore"},
            events: [{type:"click",fn:makeOver.restore}]
        };

        let pOptions = {
            element: "p",
            cssClass: ["editboks"],
            attribs: {id:"editbox_"+settings.id}
        };

        //een input of een textArea?
        let evOpts = "";
        if (settings.type =="input"){
            evOpts = eVeldInputOpties;
        } else {
            evOpts = eVeldTextAreaOpties;
        }

        // aanmaak elementen

        let eVeld = El(evOpts);
        let saveKnop = El(saveKnopOpties);
        let restoreKnop  = El(restoreKnopOpties);
        let p = El(pOptions);
        let br = document.createElement('br');

        //inhoud van het veld

        eVeld.value = settings.waarde;

        saveKnop.innerHTML = "Save";
        restoreKnop.innerHTML = "Restore";

        p.appendChild(eVeld);
        p.appendChild(br);
        p.appendChild(saveKnop);
        p.appendChild(restoreKnop);

        return p;

    }

    function saveRestore(knop, actie){
        /*
        save de wijzigingen of zet de oorspronkelijke inhoud terug

        @knop verplicht, dom node, het element waarop geklikt werd
        @actie verplicht, String, "save"||"restore"
         */

        if(knop && actie) {

            let knop_id = knop.id;
            let el_id = knop_id.substr(5);

            let eVeld_id = "edit_" + el_id;
            let eVeld = document.getElementById(eVeld_id);
            let editValue = eVeld.value;

            let el = editStapel[el_id].el;
            let orig_id = editStapel[el_id].orig_id;
            let orig_inh = editStapel[el_id].tekst;

            let imgOfNiet = (soortEl(el) == "img");

            let hoe = imgOfNiet?"src":"innerHTML";
            let wat_orig = imgOfNiet?img_base_url+editStapel[el_id].bestand:editStapel[el_id].test;
            let wat_gewijzigd = imgOfNiet?img_base_url+editValue:editValue;

            switch (actie) {
                case "save":
                    el[hoe] = wat_gewijzigd;
                    bewaarGegevens(orig_id,editValue);
                    break;
                case "restore":
                    el[hoe] = wat_orig;
                    el.innerHTML = orig_inh;
                    break;
                default:
                    console.log("saveRestore: verkeerde actie");
                    break;
            }

            el.id = orig_id;
            delete editStapel[el_id];
            removeEditBox(el_id);

        }
        else {
            throw new Error ('saveRestoer: verkeerd argument')
        }
    }

    function removeEditBox(iad) {
        /* verwijder editbox
        @id verplich, id van het element
         */

        let d = "edit_" + iad;
        let box = document.getElementById(d);
        console.log(box.parentNode);
        box.parentNode.parentNode.removeChild(box.parentNode);

        //box.parentNode.removeChild(box)
    }

    function soortEl(el) {
        // returnt de tagName in kleine letters

        return el.nodeName.toLowerCase();
    }

    function ajaxCall(params, successFunctie, element) {
        /*
        // dependency ajaxhandler.js
         @params eventuele query paaram
         @succesfunctie verplicht, functie bij succes
         @element output element waarop succes werkt
         */

        // eventhandlers

        let aH = new ajaxhandler();
        // opties object

        let opties = {
            url: ajax_base_url,
            method: "GET",
            data: params,
            callback: {
                success: function(responseText) {
                    if (responseText) {
                      successFunctie(responseText, element);
                    }
                },
                failure: function(statusCode) {
                    alert('Fout: ' + statusCode)
                }
            }
        };

        aH.request(opties);
    }

    function verwerkProfielGegevens(JSOON) {
        /*
        verwerkt de gegevens
        dependency nuttig_lib.js, json_parse
        @JSON verplicht, JSON object
         */


        let persoon = JSON.parse(JSOON); // Json_parse.js
        let profiel = document.getElementById('profiel');
        let profieldata = getElementsByClassName('profieldata',profiel); // nuttig_lib.js

        for(let i=0;i<profieldata.length;i++){
            let ide = profieldata[i].id;
            let waarde = persoon[ide];

            if(soortEl(profieldata[i]) == "img") {
                profieldata[i].src = img_base_url + waarde;
            }
            else {
                profieldata[i].innerHTML = waarde;
            }
        }

    }

    function bewaarGegevens(veld,waarde){
        /*
        vult gegevens uit ajaxcall voor alle editeerbare velden
        @veld verplicht, naam (id) van het veld
        @waarde verplicht, te updaten waarde van het veld
         */

        ajaxCall("actie=schrijf&veld="+veld+"&inh="+waarde+"&idpers=1",debugOK,null);
    }

    function debugOK(str) {
        //console.log("bewaarGegevens call, de Response is:" + str) ;
    }





    //== PUBLIC OBJECT ==
    return {
        init: function() {
            registreer()
        },

        edit: function(){
            if(soortEl(this) == "img") {
                beeldWijzigbaar(this);}
            else {
                tekstWijzigbaar(this);
            }
        },

        save: function(){
          //console.log('makeOver.save: ' + this.id)
            saveRestore(this, "save");
        },

        restore: function() {
            console.log('makeOver.restore: ' + this.id);
            saveRestore(this, "restore");
        },

        laadProfiel: function(){
            ajaxCall("actie=lees&idpers=1&veld=alle", verwerkProfielGegevens, null);
        }

    }
}();