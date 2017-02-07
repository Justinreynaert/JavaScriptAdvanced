// onload event

window.onload = function() {

    var cirkel = new Cirkel("Cirkeltje", 5);
    cirkel.spreek();
    cirkel.schrijf();

    var veelhoek = new Veelhoek("Veelhoek", 8);
    veelhoek.spreek();

    var driehoek = new Driehoek("Driehoekje", [12,12,15]);
    driehoek.spreek();
    driehoek.schrijf();

};

// constructors

// *** HOOFDKLASSE VORM *** //
function Vorm(naam, type, tekst) {
    this.naam = naam;
    this.type = type;
    this.tekst = tekst;
}

Vorm.prototype.spreek = function() {
    alert(this.tekst);
};

Vorm.prototype.schrijf = function() {
    document.getElementById('output').innerHTML = enumerate(this);
};

//*** KLASSE CIRKEL ***//

function Cirkel(naam, straal) {
    Vorm.call(this, naam, "Circel", "Ik ben een Cirkel");
    this.straal = straal;
}

Cirkel.prototype = new Vorm();
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
    alert(this.tekst + ",\n" + strInfo)
};

//*** KLASSE VEELHOEK ***//

function Veelhoek(naam, aantalHoeken) {
    Vorm.call(this, naam, "Veelhoek", "Ik ben een Veelhoek");
    this.aantalHoeken = aantalHoeken;
}

Veelhoek.prototype = new Vorm();

Veelhoek.prototype.spreek = function() {
    var strInfo = "Ik heb een " + this.aantalHoeken + " hoeken";
    alert(this.tekst + ",\n" + strInfo)
};

//** KLASSE DRIEHOEK ***//

function Driehoek(naam,arrZijden) {
    Veelhoek.call(this, naam, "Driehoek", "Ik ben een driehoek", 3);
    this.zijden = arrZijden;
}

Driehoek.prototype = new Veelhoek();

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
    console.log(nOmtrek);
    console.log(this.zijden[0]);
    console.log(this.zijden[1]);
    console.log(this.zijden[2]);

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
    alert(this.tekst + ",\n" + strInfo)
};

//** KLASSE VIERHOEK ***//

function Vierhoek(naam, type, tekst, lengte, breedte) {
    Veelhoek.call(this, naam, type, tekst, 4);
    this.lengte = lengte;
    this.breedte = breedte;
}

Vierhoek.prototype = new Veelhoek();

Vierhoek.prototype.omtrek = function() {
    this.omtrek = (this.lengte + this.breedte)*2
};

Vierhoek.prototype.oppervlakte = function() {
    this.oppervlakte = (this.lengte * this.breedte)/2
};

//** KLASSE VIERKANT **/

function Vierkant(naam, zijde) {
    Vierhoek.call(this, naam, "vierkant", "Ik ben een vierkant");
    this.zijde = zijde;
}

Vierkant.prototype = new Vierhoek();

Vierkant.prototype.omtrek = function() {
    this.omtrek = this.zijde * 4;
};

Vierkant.prototype.oppervlakte = function() {
    this.oppervlakte = Math.pow(this.zijde, 2);
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