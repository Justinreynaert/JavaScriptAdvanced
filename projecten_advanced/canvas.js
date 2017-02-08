window.onload = function () {
    let canvas = document.getElementById('canvas');
    //rechthoeken(canvas);
    //driehoeken(canvas);
     Cirkel(canvas);
    //boog(canvas);
    //boog2(canvas);
    cirkelGevuld(canvas);
    schrijf(canvas);
};

function rechthoeken(c) {
    let ctx = c.getContext('2d');

    if(ctx) {
        ctx.fillStyle = "yellow";
        ctx.strokeStyle = "#000";
        ctx.fillRect(50,50,200,70); // x, y, breedte , hoogte
        ctx.strokeRect (80,80,200,70);
        ctx.clearRect(100,20,50,160);
    }
}

function driehoeken(c) {
    let ctx = c.getContext('2d');
    ctx.strokeStyle = "rgb(200,0,0)";
    ctx.fillStyle = "white";
    ctx.lineWidth = 15;
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(400,100);
    ctx.lineTo(300,250);
    ctx.lineTo(500,250);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

var Cirkel = (c) => {
    let ctx = c.getContext('2d');

    if (ctx) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";

        let straal = 100;
        let middelpuntX = 200;
        let middelpuntY = 400;

        ctx.beginPath();
        ctx.arc(middelpuntX, middelpuntY, straal, 0, Math.PI * 2, true); // volledige cirkel
        ctx.stroke();
    }

};

function boog(c) {
    let ctx = c.getContext('2d');

    if (ctx) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";

        let straal = 100;
        let middelpuntX = 400;
        let middelpuntY = 400;

        ctx.beginPath();
        ctx.arc(middelpuntX, middelpuntY, straal, 0, Math.PI,true); // volledige cirkel
        ctx.stroke();
    }


}

function boog2(c) {
    let ctx = c.getContext('2d');

    if (ctx) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";

        let straal = 100;
        let middelpuntX = 600;
        let middelpuntY = 400;

        ctx.beginPath();
        ctx.arc(middelpuntX, middelpuntY, straal, 0, Math.PI,false ); // volledige cirkel
        ctx.stroke();
    }


}

function cirkelGevuld(c) {
    let ctx = c.getContext('2d');

    if (ctx) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";

        let straal = 100;
        let middelpuntX = 200;
        let middelpuntY = 400;

        let waarden = [55,22,106];
        let totaal = 0;

        for (let i = 0; i < waarden.length; i++) {
            totaal += waarden[i];
        }

        let kleuren     = ["red","blue","green"];
        let pi          = Math.PI;
        let starthoek   = 0;
        let eindhoek    = 0;

       for (let i = 0; i< waarden.length; i++) {

           booglengte = (waarden[i]/totaal) * pi * 2;
           eindhoek = starthoek + booglengte;
           ctx.beginPath();
           // ctx.strokeStyle = kleuren[i];
           ctx.fillStyle = kleuren[i];
           ctx.arc(middelpuntX, middelpuntY, straal, starthoek, eindhoek,false);
           ctx.lineTo(middelpuntX,middelpuntY);
           //ctx.stroke();
           ctx.fill();
           starthoek = eindhoek;
       }

    }


}

function schrijf(c) {
    let ctx = c.getContext('2d');
    let tekst = "justin";

    let x = 500;
    let y = 500;

    let R = 5;
    let G = 5;
    let B = 5;


    if(ctx){
        ctx.font = "italic 120px Arial, sans serif";
        //ctx.strokeStyle = "black";
        ctx.fillStyle = rgb(R,G,B);
        //ctx.strokeText(tekst,x,y);
        ctx.fillText(tekst,x,y);
    }
}

function rgb(r,g,b) {
    r = (r > 255 || r < 0 )?0:r;
    g = (g > 255 || g < 0  )?0:g;
    b = (b > 255 || b < 0 )?0:b;
    return "rgb(" + r + "," + g + "," + b + ")";
}

class Punt {
    constructor (x,y) {
        this.x = x;
        this.y = y;
    }
}

class Cirkel {
    constructor (middelpunt, straal, randKleur, vulKleur, vullen) {
        this.middelpunt = middelpunt;
        this.straal = straal;
        this.randKleur = randKleur;
        this.vulKleur = vulKleur;
        this.vullen = vullen;
    }
}