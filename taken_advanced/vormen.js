window.onload = function() {
    //console.log('test')



    var veelhoek = new Veelhoek(6);
    veelhoek.spreek();





};

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

/*** constructors ***/

/* Vorm class */

function Vorm(naam, type, tekst) {
    if (typeof naam === 'string') { this.naam = naam; }
    if (typeof type === 'string') { this.type = type; }
    if (typeof tekst === 'string') { this.tekst = tekst }
    this.info = function() {
        return "Ik ben " + this.naam + ", " + this.type + ", " + this.tekst
    };
    this.spreek = function() {
        alert(this.info());
    };
    this.schrijf = function() {
        document.getElementById('output').innerHTML = enumerate(this);
    };
}

Vorm.prototype.oppervlakte = function(){
    alert(this.spreek());
};

Vorm.prototype.omtrek = function(){
    alert(this.spreek())
};

/* Cirkel class */

function Circle(straal) {
    Vorm.call(this, "Circle", "Circle", "Ik ben een circle");
    if (typeof straal === 'number') { this.straal = straal; }
}

Circle.prototype = new Vorm();
Circle.prototype.oppervlakte = function() {
    this.oppervlakte = Math.pow(this.straal, 2) * Math.PI;
    alert(this.oppervlakte);
};

Circle.prototype.omtrek = function() {
    this.omtrek = (this.straal * 2) * Math.PI;
    alert(this.omtrek);
};


/* Veelhoek class */

function Veelhoek(aantalHoeken) {
    Vorm.call(this, "veelhoek", "veelhoek", "ik ben een veelhoek");
    if (typeof aantalHoeken === 'number') { this.aantalHoeken = aantalHoeken}
}

Veelhoek.prototype = new Vorm();

Veelhoek.prototype.spreek = function() {

    var nHoeken = this.aantalHoeken;
    var sHoeken = "\n Ik heb " + nHoeken + " hoeken.";
    alert(this.info() + sHoeken);

};

/* Driehoek class */
function Driehoek(arrZijden) {
    Veelhoek.call(this, "Driehoek", "Driehoek", "ik ben een driehoek");
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
    this.omtrek();
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

/* Vierhoek class */
function Vierhoek(lengte, breedte) {
    Veelhoek.call(this, "vierhoek", "vierhoek", "ik ben een vierhoek", "4");
    if (typeof lengte === 'number') { this.lengte = lengte}
    if (typeof breedte === 'number') { this.breedte = breedte}
}

Vierhoek.prototype = new Veelhoek();

Vierhoek.prototype.omtrek = function() {
    this.omtrek = (this.lengte + this.breedte)*2
};

Vierhoek.prototype.oppervlakte = function() {
  this.oppervlakte = (this.lengte * this.breedte)/2
};


/* Vierkant class */
function Vierkant(zijde) {
    Vorm.call(this, "Vierkant", "Vierkant", "Ik ben een vierkant");
    if (typeof zijde === 'number') { this.zijde = zijde}
}
Vierkant.prototype = new Vierhoek();

Vierkant.prototype.omtrek = function() {
  this.omtrek = this.zijde * 4;
};

Vierkant.prototype.oppervlakte = function() {
    this.oppervlakte = Math.pow(this.zijde, 2);
};