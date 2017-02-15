let cookieBank = function() {
    // private vars
        const startSaldo = 100;
        let berichten = []; // leeg arary

    // private functions
    function viewNieuw() {
        /*
        functionaliteit voor niet klant = GEEN cookies
        HTML + eventhandlers
         */

        //welkomstTekst
        let str = "welkom beste bezoeker.";
        str += "Als u bij ons een nieuwe rekening opent," +
            "ontvangt u een startsaldo van 100 euro!";

        let p = document.createElement('p');
        p.appendChild(document.createTextNode(str));

        //open_rekening knop
        let openRekKnop = maakKnop('Rekening openen','openRek');
        openRekKnop.onclick = function() { cookieBank.openRekening()};
        let lbl = document.createElement('label');
        lbl.appendChild(document.createTextNode('Open een nieuwe rekening'));
        lbl.appendChild(openRekKnop);

        //container
        let nieuw = document.createElement('div');
        nieuw.id = "nieuw";

        nieuw.appendChild(p);
        nieuw.appendChild(lbl);

        return nieuw;
    }

    function viewKlant(klantNaam, saldo) {
        /*
        @klantNaam string,naam
        @saldo number, saldo
        voorziet alle functionaliteit voor iemand die klant is = cookies heeft:
        html + eventhandlers
         */

        //welkomtekst
        let str= "Welkom " + cookieBank.klantNaam;
        str += ", uw Saldo bedraagt " + cookieBank.saldo + " Euro";

        let p = document.createElement('p');
        p.appendChild(document.createTextNode(str));

        //debit/krediet
        let input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('name','bedrag');
        input.setAttribute('id','bedrag');

        //object property instellen
        cookieBank.bedragVeld = input;

        let lbl = document.createElement('label');
        lbl.appendChild(document.createTextNode('bedrag'));
        lbl.appendChild(input);

        let kredietKnop = maakKnop('+', 'kredietRek');
        kredietKnop.addEventListener('click',function(){
            cookieBank.berekenen('+');
        });

        let debietKnop = maakKnop('-', 'debietRek');
        debietKnop.addEventListener('click',function(){
            cookieBank.berekenen('-');
        });

        let sluitRekKnop = maakKnop('Rekening sluiten', 'sluitRek');
        sluitRekKnop.addEventListener('click', function(){
            cookieBank.sluitRekening()
        });

        //container
        let klant= document.createElement('div');
        klant.id = "klant";
        klant.appendChild(p);
        klant.appendChild(lbl);
        klant.appendChild(kredietKnop);
        klant.appendChild(debietKnop);
        klant.appendChild(sluitRekKnop);

        console.log(klant);

        return klant
    }

    function maakKnop(tekst, id){
        /*
        returnt een button element
        @tekst string, verplicht, de tekst voor de knop
        @id string, verplicht, het id van het element
         */

        let knop = document.createElement('button');
        let knopTekst = document.createTextNode(tekst);
        knop.appendChild(knopTekst);
        knop.setAttribute('type','button');
        knop.id = id;
        return knop;
    }

    function initRekening(klantnaam) {
        // start de rekening

        setCookie('klantnaam',klantnaam,100);
        setCookie('saldo',startSaldo,100);
        window.history.go(0);
    }

    function stopRekening() {
        // verwijdert de rekening
        clearCookie('klantnaam');
        clearCookie('saldo');
        window.history.go(0);
    }

    function berichtToevoegen(str){
        //voegt een bericht toe aan het array berichten
        berichten.push(str);
    }

    function toonBerichten(){
        /*
        lust doorheen het array berichten en toont ze
         */

        if(berichten.length>0){
            //lus doorheen alle berichten en produceer een unordered list

            let str ="<ul>";
            for (let i=0;i<berichten.length;i++) {
                str += "<li>" + berichten[i] + "</li>";
            }

            str += "</ul>";

            cookieBank.divBerichten.innerHTML = str;
            cookieBank.divBerichten.style.display = "block";
        }
    }

    function clearBerichten() {
        // verwijdert alle berichten

        berichten=[];
    }
    // the object
        return {
            //object met publieke properties: DOM elementen, variabelen en methods
            divBerichten : undefined,
            divOutput : undefined,
            bedragVeld : undefined,
            saldo : undefined,
            klantNaam : undefined,

            // opstartfunctie

            welkom: function(){

                // referenties leggen
                this.divOutput = document.getElementById('output');
                this.divBerichten = document.getElementById('berichten');

                //test aanwezigheid cookie
                if(getCookie('klantnaam')) {
                    //tweede bezoek
                    this.saldo = parseFloat(getCookie('saldo')).toFixed(2);
                    this.klantNaam = getCookie('klantnaam');

                    // view
                    this.divOutput.appendChild(viewKlant())

                } else {
                    //eerste bezoek
                    //view
                    this.divOutput.appendChild(viewNieuw());
                }



            },

            //storting of geldafhaling

            berekenen: function(bewerking) {
                /*
                storting of geldafhaling
                @bewerking = een + of een - teken
                 */

                let bedrag = this.bedragVeld.value;
                let re = /,/;
                bedrag = bedrag.replace(re,'.');
                let nieuwSaldo = 0;
                bedrag = parseFloat(bedrag);
                clearBerichten();

                if(!isNaN(bedrag)) {
                    this.saldo = parseFloat(this.saldo);
                    switch(bewerking) {
                        case '+':
                            nieuwSaldo = this.saldo + bedrag;
                            setCookie('saldo',nieuwSaldo,100);
                            window.history.go(0);
                            this.bedragVeld.value = "";
                            break;

                        case '-':
                            nieuwSaldo = this.saldo - bedrag;
                            if(nieuwSaldo<=0) {
                                let max = this.saldo - 1;
                                strBericht = "Uw saldo is onvoldoende om dit bedrag af te halen. ";
                                strBericht = "U kunt maximaal " + max + " Euro afhalen.";

                                berichtToevoegen(strBericht);
                                toonBerichten();
                                this.bedragVeld.value = max;
                                this.bedragVeld.focus()
                            } else {


                                setCookie('saldo', nieuwSaldo, 100);
                                window.history.go(0);
                                this.bedragVeld.value = "";
                            }
                            break;

                    }
                }

                else {
                    strBericht = 'U moet een correct bedrag ingeven';
                    berichtToevoegen(strBericht);
                    toonBerichten();
                    this.bedragVeld.focus();
                }
            },

            //open een rekening
            openRekening: function(){

                let klantNaam = window.prompt("Uw naam, graag?");
                if (klantNaam!="" && klantNaam!=null){
                    //initialiseer
                    initRekening(klantNaam)
                }

            },

            //sluit een rekening
            sluitRekening: function(){
                // geeft door aan private functie
                stopRekening();
            }
        }
}();