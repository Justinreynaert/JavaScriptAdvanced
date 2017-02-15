// array of array die gegevens bevat
let aaWeergegevens2009 = [
    ["temperatuur","neerslag"],
    ["jan",29,62.9],
    ["feb",60,57.1],
    ["mar",40,68.2],
    ["apr",12.5,49],
    ["mei",14.4,43.1],
    ["jun",100,64.5],
    ["jul",18.7,73.1],
    ["aug",19.4,34.7],
    ["sep",15.8,29.1],
    ["okt",11.3,106],
    ["nov",9.7,98],
    ["dec",6,60]

   // ["dec",6,110]
];

// Test array voor correcte verdeling
/*let aaWeergegevens2009 = [
    ["temperatuur","neerslag"],
    ["jan",1,1],
    ["feb",2,2],
    ["mar",3,3],
    ["apr",4,4],
    ["mei",5,5],
    ["jun",6,6],
    ["jul",7,7],
    ["aug",8,8],
    ["sep",9,9],
    ["okt",10,10]
];*/

// start onload
window.onload = function() {

    // Link naar canvas element op pagina (id weeruitslagen)
    let eCanvas = document.getElementById('weeruitslagen');

    // Lege arrays om de AA met alle gegevens op te spliten
    aMaanden = [];
    aNeerslag = [];
    aTemperaturen = [];

    // opsplitsen van de hoofdarray
    for (let i = 1; i < aaWeergegevens2009.length; i++) {
        aMaanden.push(aaWeergegevens2009[i][0]);
        aNeerslag.push(aaWeergegevens2009[i][2]);
        aTemperaturen.push(aaWeergegevens2009[i][1]);
    }

    //raster maken
    let raster = new Vorm(0,0);
    raster.teken(eCanvas, aNeerslag);

    // variabele die de blaken maakt
    let balken = new Balk(10, 0, 20, aNeerslag);
    // tekenen van de balken
    balken.teken(eCanvas);

    // variabele die de lijnen bevat
   let lijn = new Lijn(0,0,aTemperaturen,aNeerslag);
    // tekenen van de lijnen
    lijn.teken(eCanvas);

};

// SUPERCLASS VORM
class Vorm {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.font = "Arial";
        this.kleur = "black";
        this.fontSize = 15;
        // top and bot marging
        this.marging = 25;
        this.maanden = aMaanden;
    }
    teken(c, aHoogste){

        // tekent een raster
        let ctx = c.getContext('2d');
        let max = maxArray(aHoogste);
        let drawArea = c.height - this.marging;
        let aantalLijnen = 10;
        let maxRond10 = round10(max);
        let verschil = maxRond10-max;

        aantalLijnen = aantalLijnen + 1;



        // rechterlijn
        ctx.globalAlpha=1;
        ctx.lineWidth=1;
        ctx.moveTo(this.marging, 0);
        ctx.lineTo(this.marging, c.height-this.marging);

        let y = c.height - this.marging;

        // andere lijnen
        for (let i=0; i < aantalLijnen; i++) {

            ctx.moveTo(this.marging, y);
            ctx.lineTo(c.width, y);
            ctx.stroke();

            ctx.textAlign = "right";
            ctx.fillText(round2Dec(i*(maxRond10/aantalLijnen)),this.marging -5, y);

            y -= (drawArea - verschil)/ aantalLijnen;
        }
    }
}

// CLASS BALK -> INHERIT VAN VORM
class Balk extends Vorm {
    constructor(x,y, width, aHoogtes) {
        // X - Y - BREEDTE en array met hoogtes van de balken
        super(x,y);

        this.aHoogtes = aHoogtes;
        this.width = width;
    }
    teken(c){
        // teken methode van de class balk - Tekent ALLE balken die getekent kunnen worden met gegevens uit de array
        let ctx =c.getContext('2d');

        // lengte  van de array
        let arrLength = this.aHoogtes.length;

        // hoogtste waarde in de array -- helperfunctie
        let max = maxArray(this.aHoogtes);

        let verschil = round10(max)-max;
        console.log(verschil);

        // loopt door de array
        for (let i = 0; i < arrLength; i++) {

            // hoogte en breedte van het canvas
            let marging = this.marging;
            let cBreedte = c.width-marging;
            let cHoogte = c.height;

            // variabele breedte
            let width = this.width;

            // schaling correct maken
            //let verm = (verschil*(cHoogte/max)/cHoogte);

            let opSchaal = verschil*(c.height/max);

            let height = this.aHoogtes[i]*(c.height/max)*((cHoogte - marging)/cHoogte)*((cHoogte - opSchaal)/cHoogte);

            // X = i * (canvasbreedte /
            let x = i*(cBreedte/arrLength) + ((cBreedte/arrLength) / 2) - (this.width / 2) +marging;
            //console.log(this.y);
            let y = cHoogte - height - marging;

            ctx.fillStyle = "dodgerblue";
            ctx.fillRect(x,y+1,width,height);

            // tekst
            ctx.font = this.fontSize + "px " + this.font;
            ctx.fillStyle = this.kleur;

            let fontX = x;
            let fontY = y - 5;

            if (fontY < 10) {
                let font = this.fontSize + 5;
                ctx.textAlign = "left";
                ctx.fillText(this.aHoogtes[i].toString(),fontX, font);

            } else {
                ctx.textAlign = "left";
                ctx.fillText(this.aHoogtes[i].toString(),fontX, fontY);
            }

            fontY = fontY + height + this.fontSize/2 + marging/2  ;
            ctx.fillText(this.maanden[i],fontX, fontY);
        }


    }

}

class Lijn extends Vorm {
    constructor(x,y,arrPunten, arrHoogste) {

        super(x,y);

        this.punten = arrPunten;
        this.kleur = "red";
        this.fontSize = 15;
        this.hoogste = maxArray(arrHoogste);
    }

    teken(c) {
        let ctx = c.getContext('2d');
        let marging = this.marging;
        let cBreedte = c.width-marging;
        let cHoogte = c.height;
        let drawArea = c.height - this.marging;


        // schaling correct maken
        //let verm = (verschil*(cHoogte/max)/cHoogte);
        let verschil = round10(this.hoogste)-this.hoogste;
        let opSchaal = verschil*(c.height/this.hoogste);


        // lijnbreedte
        ctx.lineWidth = 2;

        // lijnkleur
        ctx.strokeStyle = "red";

        ctx.beginPath();
        //ctx.lineJoin = "Butt";

        for(let i = 0; i<this.punten.length;i++) {
           let x = i * (cBreedte/this.punten.length) + ((cBreedte/this.punten.length) / 2) + marging;
           let y = this.punten[i]*(c.height/this.hoogste)*((cHoogte - marging)/cHoogte)*((cHoogte - opSchaal)/cHoogte);

           let yy = drawArea - y;
            console.log(y);



           ctx.lineTo(x, yy);

            // tekst
            ctx.font = this.fontSize + "px " + this.font;
            ctx.fillStyle = this.kleur;

            ctx.fillText(this.punten[i].toString() + " C\xB0", x-this.fontSize, yy - this.fontSize)
        }
        ctx.stroke();
    }
}

// HELPER FUNCTIONS

function maxArray(array) {
    // @array - Array met numbers
    // hoogste waarde in een arary
    if (array.constructor === Array) {
    return Math.max.apply(Math, array);
    }
}

function round10(x) {
    // @x - een number
    // returnde eerste waarde die deelbaar is door 10 en geen deelwaarde heeft
    if (typeof x === 'number') {
        return Math.ceil(x/10)*10;
    }
}


function round2Dec(x) {
    // @x - een number
    // rond getal of op 2 decimalen
    if (typeof x === 'number') {
        return Math.round(x * 100) / 100;
    }
}

