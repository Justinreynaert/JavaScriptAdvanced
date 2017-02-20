// onload

window.onload = function() {
//DOM elementen

    let brouwerLijst = document.getElementById('brouwers');
    let bierLijst = document.getElementById('bieren');


    let bierData = document.getElementById('bierData');

    initialisatieLijst(brouwerLijst);
    lijstUpdateHandler(brouwerLijst,bierLijst, 'brouwerNr');
    divUpdateHandler(bierLijst, bierData, 'bierNr');

    };

function vulSelect(xmldomdoc, keuzelijst) {
    /*

     vult een bestaand SELECT element aan met meer OPTION4's uit het XMLdomdoc, aanwezig OPTION'S blijven

     @xmldomdoc  verplicht, xmldomdocument
     @keuzelijst verplicht, een SELECT element
     */

    let root = xmldomdoc.documentElement; // root element

    let kindjes = root.childNodes;

    //console.log(kindjes);
    let aantalKindjes = kindjes.length;
    let n; // naam attribuut in xml element
    let v; // waarde te geven aan value attribuut van option element: kan ofwel code of inw attr van xml zijn

    //eerdere provincies/steden moeten verwijderd worden

    cleanList(keuzelijst);

    // lus doorheen de children en produceer OPTION elementen

    for (let i=0; i< aantalKindjes;i++) {
        //console.log(kindjes[i]);
        n = kindjes[i].childNodes[0].nodeValue;


        v = kindjes[i].attributes[0].nodeValue;
        let opt = document.createElement('option');

        opt.setAttribute('value',v);
        opt.appendChild(document.createTextNode(n));

        keuzelijst.appendChild(opt);
    }
}

function vulDiv(xmldomdoc, container) {
    let root = xmldomdoc.documentElement;//root
    let kindjes = root.childNodes;

    //console.log(kindjes);

    let aantalKindjes = kindjes.length;

    cleanDiv(container);

    eUl = document.createElement('ul');

    for (let i=0; i< aantalKindjes;i++) {
        eLi = document.createElement('li');
        eLi.innerText = kindjes[i].nodeName + ": " + kindjes[i].childNodes[0].nodeValue;
        eUl.appendChild(eLi);
    }

    container.appendChild(eUl);


}

function lijstUpdateHandler(keuzeLijst, updateLijst, param) {
    /*
     eventhandlers voor knoppen die een lijst moeten updaten

     @btn - Button element voor wie hier een eventhandler gemaakt wordt
     @keuzelijst - Select element wiens waarde gebruikt wordt voor de Ajax call
     @updateLijst Select element die zal opgevuld worden door de ajax return
     */

    keuzeLijst.addEventListener('click',function(){
        console.log(keuzeLijst.value);
        let gekozen = keuzeLijst.value; // keuze uit lijst

        if (gekozen!="") {
            // update lijst

            let params = param + "=" + gekozen;

            //params, succesfunctie, element
            ajaxCall(params, vulSelect, updateLijst);
            if (keuzeLijst.selectedIndex != keuzeLijst.value) {

                //updateLijst.focus();
            }

        }

        else {
            //niet gekozen
            alert('U moet een geldige keuze maken');
            keuzeLijst.focus();
        }


    })
}

function divUpdateHandler(keuzeLijst, updateDiv, param) {
    /*
     eventhandlers voor knoppen die een lijst moeten updaten

     @btn - Button element voor wie hier een eventhandler gemaakt wordt
     @keuzelijst - Select element wiens waarde gebruikt wordt voor de Ajax call
     @updateLijst Select element die zal opgevuld worden door de ajax return
     */

    keuzeLijst.addEventListener('click',function(){
        let gekozen = keuzeLijst.value; // keuze uit lijst

        if (gekozen!="") {
            // update lijst

            let params = param + "=" + gekozen;

            //params, succesfunctie, element
            ajaxCall(params, vulDiv, updateDiv);



        }

        else {
            //niet gekozen
            alert('U moet een geldige keuze maken');
            keuzeLijst.focus();
        }


    })
}

function ajaxCall(params, successFunctie, element) {
    /*
     @params eventuele query paaram
     @succesfunctie verplicht, functie bij success
     @element output element waarop succes werkt
     */

    // eventhandlers

    let aH = new ajaxhandler();

    let opties = {
        url: "bieren_ajaxdata.php",
        method: "GET",
        data: params,
        callback: {
            success: function(responseXML, responseText) {
                successFunctie(responseXML, element);
            },
            failure: function(statusCode) {
                alert('Fout: ' + statusCode)
            }
        }
    };

    aH.request(opties);

}


function cleanList(eSel) {
    /*
     verwijdert alle option elementen uit een SELECT met uitzonderen van de eerste :
     */

    if(eSel.nodeName.toLowerCase()=="select"){
        while(eSel.options.length>1) {
            eSel.removeChild(eSel.lastChild);
        }
    }
}

function initialisatieLijst(keuzeLijst) {

            let params = "";
            ajaxCall(params, vulSelect, keuzeLijst);

}

function cleanDiv(ediv) {
    // maakt div leeg

    ediv.innerHTML = "";
}

