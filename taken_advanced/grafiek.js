// array of array die gegevens bevat
let aaWeergegevens2009 = [
    ["temperatuur","neerslag"],
    ["jan",29,62.9],
    ["feb",3.6,57.1],
    ["mar",6.7,68.2],
    ["apr",12.5,47.1],
    ["mei",14.4,43.1],
    ["jun",16.6,64.5],
    ["jul",18.7,73.1],
    ["aug",19.4,34.7],
    ["sep",15.8,29.1],
    ["okt",11.3,105],
    ["nov",9.7,98],
    ["dec",6,60]
];

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

    console.log(aTemperaturen);

    //raster maken

    let raster = new Vorm(0,0);

    raster.teken(eCanvas);

    // variabele die de blaken maakt
    let balken = new Balk(10, 0, 20, aNeerslag);
    // tekenen van de balken
    balken.teken(eCanvas);

    // variabele die de lijnen bevat
    let mijnLijn = new Lijn(0,0,aTemperaturen);
    // tekenen van de lijnen
    mijnLijn.teken(eCanvas);











};

// SUPERCLASS VORM
class Vorm {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.font = "Comic Sans MS";
        this.kleur = "red";
        this.fontSize = 15;
        // top and bot marging
        this.marging = 50;
        this.maanden = aMaanden;


    }
    teken(c){

        // tekent een raster

            let ctx = c.getContext('2d');
            let lines = 10;
            let x = this.x;
            let y = c.height - this.marging;
            let inc = c.height / lines;

            for (let i=0; i < lines; i++) {
                ctx.strokeStyle = this.kleur;
                ctx.beginPath();
                ctx.moveTo(this.marging, y);
                ctx.lineTo(c.width, y);
                ctx.stroke();

                y = y - inc;
            }



            ctx.strokeStyle = this.kleur;
            ctx.beginPath();
            ctx.moveTo(this.marging, 0);
            ctx.lineTo(this.marging, c.height-this.marging);
            ctx.stroke();



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

        ctx.globalAlpha = 1;

        // lengte  van de array
        let arrLength = this.aHoogtes.length;

        // hoogtste waarde in de array -- eigen functie
        let max = maxArray(this.aHoogtes);


        // loopt door de array
        for (let i = 0; i < arrLength; i++) {

            // hoogte en breedte van het canvas
            let marging = this.marging;
            let cBreedte = c.width-marging;
            let cHoogte = c.height;

            // variabele breedte
            let width = this.width;

            // hoogte = hoogte van arraywaarde * canvasbreedte / maxwaarde - y waarde
            let height =this.aHoogtes[i]*(cBreedte/max)-this.y-marging*2;

            // X = i * (canvasbreedte /
            let x = i*(cBreedte/arrLength) + ((cBreedte/arrLength) / 2) - (this.width / 2) +marging;
            let y = this.y+cHoogte-height-marging;

            ctx.fillStyle = "dodgerblue";
            ctx.fillRect(x,y,width,height);

            // tekst

            ctx.font = this.fontSize + "px " + this.font;
            ctx.fillStyle = this.kleur;

            let fontX = x;
            let fontY = y - 5;


            if (fontY < 50) {
                fontY = this.fontSize + 5;
            }


            ctx.textAlign = "left";
            ctx.fillText(this.aHoogtes[i].toString(),fontX, fontY);

            fontY = fontY + height + this.fontSize/2 + marging/2  ;
            ctx.fillText(this.maanden[i].toString(),fontX, fontY);

        }


    }

}

class Lijn extends Vorm {
    constructor(x,y,arrPunten) {

        super(x,y);

        this.punten = arrPunten;
        this.kleur = "red";
        this.fontSize = 15;

    }

    teken(c) {
        let ctx = c.getContext('2d');
        let marging = this.marging;
        let cBreedte = c.width-marging;
        let cHoogte = c.height;
        // lijnbreedte
        ctx.lineWidth = 2;
        // lijnkleur
        ctx.strokeStyle = "red";

        ctx.beginPath();

        for(let i = 0; i<this.punten.length;i++) {
           let x = i * (cBreedte/this.punten.length) + ((cBreedte/this.punten.length) / 2) + marging;
           let y = cHoogte - this.punten[i] - marging;

           ctx.lineTo(x, y);

            // tekst

            ctx.font = this.fontSize + "px " + this.font;
            ctx.fillStyle = this.kleur;

            ctx.fillText(this.punten[i].toString() + " C\xB0", x-this.fontSize, y - this.fontSize)



        }

        ctx.stroke();



    }
}

function maxArray(array) {
    // hoogste waarde in een arary
    return Math.max.apply(Math, array);
}

