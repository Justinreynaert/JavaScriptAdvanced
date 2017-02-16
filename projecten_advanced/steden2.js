window.onload = function(){
    //dom nodes
    // knoppen
    var gewestKnop = document.getElementById('btn_gewest');
    var provKnop = document.getElementById('btn_prov');
    var stadKnop = document.getElementById('btn_stad');

    // lijsten

    var gewestLijst = document.getElementById('gewest');
    var provLijst = document.getElementById('prov');
    var stadLijst = document.getElementById('stad');

    //eventhandlers

    lijstUpdateHandler(gewestKnop, gewestLijst, provLijst);
};

///


function ajaxCall(params, successFunctie, element) {
    /*
     @params eventuele query paaram
     @succesfunctie verplicht, functie bij succes
     @element output element waarop succes werkt
     */

    // eventhandlers

    var aH = new ajaxHandler();
    // opties object

    var opties = {
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
    }

    aH.request(opties);
}

function lijstUpdateHandler(btn, keuzelijst,updateLijst) {

    /* eventhandlers

    @btn, knop
    @keuzelijst, selectgeselecteerd
    @update - select
     */


    btn.onclick = function() {
        var gekozen = keuzelijst.value;

        if (gekozen!="") {
            // update lijst
            var waarde = updateLijst.id + "_" + gekozen;
            var params = "wat=" + waarde;

            //params, succesfunctie, element
            ajaxCall(params, vulSelect, updateLijst);
            updateLijst.focus();
        }
        else {
            //niets gekozen
            alert('u moet een geldig keuze maken');
            keuzelijst.focus();
        }
    }

}


function vulSelect(xmldomdoc, keuzeLijst) {
    /*
    vult select
     */

    var root = xmldomdoc.documentElement; // root

    var kindjes = root.childNodes;
    var aantalKindjes = kindjes.length;
    var n;
    var v;

    cleanList(keuzeLijst);


    for (var i=0; i<aantalKindjes;i++) {
        n = kindjes[i].getAttribute('naam').toLowerCase();
        v = kindjes[i].getAttribute('code').toLowerCase();

        var opt = document.createElement('option');
            opt.setAttribute('value',v);
            opt.appendChild(document.createTextNode(n));
        keuzeLijst.appendChild(opt)
    }

}

function cleanList(eSel) {
    /*

     */

    if(eSel.nodeName.toLowerCase()=="select") {
        while(eSel.options.length>1){
            eSel.removeChild(eSel.lastChild);
        }
    }
}