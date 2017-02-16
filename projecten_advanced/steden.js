window.onload = function() {
    //dom nodes
    //knoppen
    let gewestKnop = document.getElementById('btn_gewest');
    let provKnop = document.getElementById('btn_prov');
    let stadKnop = document.getElementById('btn_stad');

    //lijsten
    let gewestLijst = document.getElementById('gewest');
    let provLijst = document.getElementById('prov');
    let stadLijst = document.getElementById('stad');

    //eventHandlers
    lijstUpdateHandler(gewestKnop, gewestLijst, provLijst);
    lijstUpdateHandler(provKnop, provLijst, stadLijst);
    toonGegevens(stadKnop, stadLijst);

};


function lijstUpdateHandler(btn, keuzeLijst, updateLijst) {
    /*
    eventhandlers voor knoppen die een lijst moeten updaten

    @btn - Button element voor wie hier een eventhandler gemaakt wordt
    @keuzelijst - Select element wiens waarde gebruikt wordt voor de Ajax call
    @updateLijst Select element die zal opgevuld worden door de ajax return
     */

    btn.addEventListener('click',function(){
        let gekozen = keuzeLijst.value; // keuze uit lijst

        if (gekozen!="") {
                // update lijst
                let waarde = updateLijst.id + "_" + gekozen;
                let params = "wat=" + waarde;

                //params, succesfunctie, element
                ajaxCall(params, vulSelect, updateLijst);
                updateLijst.focus();


        }

        else {
            //niet gekozen
            alert('U moet een geldige keuze maken');
            keuzeLijst.focus();
        }


    })
}

function vulSelect(xmldomdoc, keuzelijst) {
    /*

    vult een bestaand SELECT element aan met meer OPTION4's uit het XMLdomdoc, aanwezig OPTION'S blijven

    @xmldomdoc  verplicht, xmldomdocument
    @keuzelijst verplicht, een SELECT element
     */

    let root = xmldomdoc.documentElement; // root element

    let kindjes = root.childNodes;
    let aantalKindjes = kindjes.length;
    let n; // naam attribuut in xml element (provincie of stad)
    let v; // waarde te geven aan value attribuut van option element: kan ofwel code of inw attr van xml zijn

    //eerdere provincies/steden moeten verwijderd worden

    cleanList(keuzelijst);

    // lus doorheen de children en produceer OPTION elementen

    for (let i=0; i< aantalKindjes;i++) {
        n = kindjes[i].getAttribute('naam').toLowerCase();
        v = kindjes[i].getAttribute('code').toLowerCase();

        let opt = document.createElement('option');

            opt.setAttribute('value',v);
            opt.appendChild(document.createTextNode(n));

        keuzelijst.appendChild(opt);
    }
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

function toonGegevens(btn, keuzeLijst) {
    /*
    eventhandler voor resultaatbutton, pas aan naar blieven
    @btn verplicht, button element
    @keuzelijst verplicht SELECt element
     */

    let welke_button = btn.id.substr(4);

    btn.addEventListener('click', function(){
        let gekozenValue = keuzeLijst.value; // aantal inwoers
        if (gekozenValue!="") {
            //toon resultaat

            let stad = keuzeLijst.options[keuzeLijst.selectedIndex].firstChild.nodeValue;
            alert(stad + " heeft " + gekozenValue + " inwoners");

        }
        else {
            // niet gekozen
            alert("U moet eerst een geldige keuze maken");
        }
    })
}

function ajaxCall(params, successFunctie, element) {
    /*
     @params eventuele query paaram
     @succesfunctie verplicht, functie bij succes
     @element output element waarop succes werkt
     */

    // eventhandlers

    let aH = new ajaxhandler();
    // opties object

    let opties = {
        url: "steden.php",
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
