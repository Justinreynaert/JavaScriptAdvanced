
let aaWeergegevens2009 = [
    ["temperatuur","neerslag"],
    ["jan",0.7,62.9],
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
    ["dec",2.9,80.8]
];

window.onload = function() {

    let canvas = document.getElementById('weeruitslagen');
    let mijnBalk = new Balk(0,0,20,60);


    aMaanden = [];
    aNeerslag = [];
    aTemperaturen = [];

    for (let i = 1; i < aaWeergegevens2009.length; i++) {
        aMaanden.push(aaWeergegevens2009[i][0]);
        aNeerslag.push(aaWeergegevens2009[i][1]);
        aTemperaturen.push(aaWeergegevens2009[i][2]);
    }

    console.log(aMaanden + aNeerslag + aTemperaturen);

    let mijnLijn = new Lijn(20,20,aTemperaturen);
    mijnLijn.teken(canvas);


};

class Vorm {
    constructor(x,y) {
        this.x = x;
        this.y = y;

    }
    teken(c){


    }
}

class Balk extends Vorm {
    constructor(x,y) {

        super(x,y);



    }
    teken(c){
        let ctx =c.getContext('2d');
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fill();
    }
}

class Lijn extends Vorm {
    constructor(x,y,arrPunten) {

        super(x,y);
        this.punten = arrPunten;

    }

    teken(c) {
        let ctx = c.getContext('2d');
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(50, this.punten[0]);


        for(let i = 1; i<this.punten.length;i++) {
            ctx.lineTo(i * (c.width/this.punten.length), this.punten[i]);

        }

        ctx.stroke();
    }
}