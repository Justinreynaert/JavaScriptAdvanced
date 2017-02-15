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

};

function lijstUpdateHandler(btn, keuzeLijst, updateLijst) {
    /*
    eventhandlers voor knoppen die een lijst moeten updaten

    @btn - Button element voor wie hier een eventhandler gemaakt wordt
    @keuzelijst - Select element wiens waarde gebruikt wordt voor de Ajax call
    @updateLijst Select element die zal opgevuld worden door de ajax return
     */

    let basisUrl = "steden.php";

    btn.addEventListener('click',function(){
        let gekozen = keuzeLijst.value; // keuze uit lijst

        if(gekozen!="") {
            // update lijst

            let waarde = updateLijst.id + "_" + gekozen;
            let params = "wat=" + waarde;

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

function ajaxCall(params, successFunctie, element) {
    /*
    @Params - Eventuele queryparameters mee te geven met call
    @SuccessFunctie - verplicht, functie uit te voeren bij succes
    @element output element waarop de succesfunctie werkt
     */

    //eventhHandlers

    let aH = new ajaxhandler();

    //opties object
    let opties = {
        url: "steden.php",
        method: "GET",
        data: params,
        callback: {
            succes: function(responseXML, responseText) {
                successFunctie(responseXML, element)
            },

            failure: function(statusCode) {
                alert('Fout: '+ statusCode)
            }
        }
    };

    aH.request(opties);


}