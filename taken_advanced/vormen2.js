// onload event

window.onload = function() {

    var vormpje = new Vorm("vormpje","ik ben een vormpje");

    vormpje.spreek();
    vormpje.schrijf();

    var cirkel = new Cirkel("Cirkeltje",5);

    cirkel.spreek();
    cirkel.schrijf();

    var veelhoek = new Veelhoek("veelhoekje", 9);

    veelhoek.spreek();
    veelhoek.schrijf();

    var driehoek = new Driehoek("Driehoekje", [12,12,15]);

    driehoek.spreek();
    driehoek.schrijf();

    var vierhoek = new Vierhoek("Vierhoekje", 15, 12);

    vierhoek.spreek();
    vierhoek.schrijf();

    var vierkant = new Vierkant("vierkantje", 15);

    vierkant.spreek();
    vierkant.schrijf();

};

// constructors

// *** HOOFDKLASSE VORM *** //
function Vorm(naam) {
    this.naam = naam;
}

Vorm.prototype.spreek = function() {
    alert("Hallo ik ben " + this.naam + "\n " + this.tekst);
};

Vorm.prototype.schrijf = function() {

    document.getElementById('output').innerHTML += enumerate(this);
};

Vorm.prototype.type = "Vorm";
Vorm.prototype.tekst = "Ik ben een vorm";

//*** KLASSE CIRKEL ***//

function Cirkel(naam, straal) {
    Vorm.call(this, naam);
    this.straal = straal;
}

Cirkel.prototype = new Vorm();

Cirkel.prototype.type = "Cirkel";
Cirkel.prototype.tekst = "Ik ben een Cirkel";

Cirkel.prototype.oppervlakte = function() {
    this.oppervlakte = Math.pow(this.straal, 2) * Math.PI;
};
Cirkel.prototype.omtrek = function() {
    this.omtrek = (this.straal * 2) * Math.PI;
};

Cirkel.prototype.spreek = function() {
    this.oppervlakte();
    this.omtrek();
    var strInfo = "Ik heb een straal van " + afronden(this.straal) + ", een oppervlakte van " + afronden(this.oppervlakte) + " een omtrek van " + afronden(this.omtrek);
    alert("Hallo ik ben " + this.naam + "\n" + this.tekst + ",\n" + strInfo)
};




//*** KLASSE VEELHOEK ***//

function Veelhoek(naam, aantalHoeken) {
    Vorm.call(this, naam);
    this.aantalHoeken = aantalHoeken;
}

Veelhoek.prototype = new Vorm();

Veelhoek.prototype.type = "Veelhoek";
Veelhoek.prototype.tekst = "Ik ben een veelhoek";

Veelhoek.prototype.spreek = function() {
    var strInfo = "Ik heb een " + this.aantalHoeken + " hoeken";
    alert("Hallo ik ben " + this.naam + "\n" + this.tekst + ",\n" + strInfo)
};

//** KLASSE DRIEHOEK ***//

function Driehoek(naam,arrZijden) {
    Veelhoek.call(this, naam, "Driehoek", "Ik ben een driehoek", 3);
    this.zijden = arrZijden;
}

Driehoek.prototype = new Veelhoek();

Driehoek.prototype.type = "Driehoek";
Driehoek.prototype.tekst = "Ik ben een driehoek";

Driehoek.prototype.omtrek = function() {
    nZijden = this.zijden.length;
    nOmtrek = 0;

    for (var i = 0; i < nZijden; i++) {
        nOmtrek += this.zijden[i];
    }

    this.omtrek = nOmtrek;
};

Driehoek.prototype.oppervlakte = function() {

    nHaOmtrek = (this.omtrek / 2);

    var a = this.zijden[0];
    var b = this.zijden[1];
    var c = this.zijden[2];

    var s = (a+b+c) / 2;

    this.oppervlakte = Math.sqrt(s*(s-a)*(s-b)*(s-c));
};

Driehoek.prototype.spreek = function() {
    this.omtrek();
    this.oppervlakte();
    var strInfo = "Ik heb een oppervlakte van " + afronden(this.oppervlakte) + " een omtrek van " + afronden(this.omtrek);
    alert("Hallo ik ben " + this.naam + "\n" + this.tekst + ",\n" + strInfo)
};

//** KLASSE VIERHOEK ***//

function Vierhoek(naam, lengte, breedte) {
    Veelhoek.call(this, naam);
    this.lengte = lengte;
    this.breedte = breedte;
}

Vierhoek.prototype = new Veelhoek();

Vierhoek.prototype.type = "Vierhoek";
Vierhoek.prototype.tekst = "Ik ben een vierhoek";

Vierhoek.prototype.omtrek = function() {
    this.omtrek = (this.lengte + this.breedte)*2
};

Vierhoek.prototype.oppervlakte = function() {
    this.oppervlakte = (this.lengte * this.breedte)/2
};

Vierhoek.prototype.spreek = function() {
    this.omtrek();
    this.oppervlakte();
    var strInfo = "Ik heb een oppervlakte van " + afronden(this.oppervlakte) + " een omtrek van " + afronden(this.omtrek);
    alert("Hallo ik ben " + this.naam + "\n" + this.tekst + ",\n" + strInfo)
};

//** KLASSE VIERKANT **/

function Vierkant(naam, zijde) {
    Vierhoek.call(this, naam);
    this.zijde = zijde;
}

Vierkant.prototype = new Vierhoek();

Vierkant.prototype.type = "Vierkant";
Vierkant.prototype.tekst = "Ik ben een vierkant";

Vierkant.prototype.omtrek = function() {
    this.omtrek = this.zijde * 4;
};

Vierkant.prototype.oppervlakte = function() {
    this.oppervlakte = Math.pow(this.zijde, 2);
};


Vierkant.prototype.spreek = function() {
    this.omtrek();
    this.oppervlakte();
    var strInfo = "Ik heb een oppervlakte van " + afronden(this.oppervlakte) + " een omtrek van " + afronden(this.omtrek);
    alert("Hallo ik ben " + this.naam + "\n" + this.tekst + ",\n" + strInfo)
};


/** algemene functies **/

function enumerate(obj) {
    //overloop alle eigenschappen van een object
    // return string, voor console.log

    var sProps = "<ul>";
    for (var key in obj) {
        if (typeof obj[key] === "object") {
            sProps += "<li>";
            sProps += key;
            sProps += enumerate(obj[key]);
            sProps += "</li>";
        }
        else {
            sProps += "<li>" + key + "(" + typeof obj[key] + "): " + obj[key] + "</li>\n";
        }
    }

    sProps += "</ul>\n";
    return sProps;
}

function afronden(number) {
    return Math.round(number * 100) / 100;
}