window.onload = function () {
    let canvas = document.getElementById('canvas');

    //mijnCirkel(canvas);

    //bubbles(canvas, 10);

    mijnVeelhoek(canvas);

};

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
    teken(c) {
        if(c) {
            let ctx = c.getContext('2d');
            ctx.strokeStyle = this.randKleur;
            ctx.fillStyle = this.vulKleur;
            ctx.beginPath();
            ctx.arc(this.middelpunt.x, this.middelpunt.y, this.straal, 0, Math.PI*2, true);
            // 2 PI = volledige cirkel

            if(this.vullen === true ) {
                ctx.fill();
            }
            else {
                ctx.stroke();
            }
        }
    }
}

class Veelhoek {
    constructor (arrPunten, lijnkleur, vulkleur) {
        this.punten = arrPunten || [];
        this.lijnkleur = lijnkleur;
        this.vulkleur = vulkleur;
        this.lijnstijl = "round";
    }
    teken(c,vullen) {
        this.vullen = vullen || false;

        if(c) {
            let ctx = c.getContext('2d');
            ctx.lineWidth = 10;
            ctx.strokeStyle = this.lijnkleur;
            ctx.fillStyle = this.vulkleur;
            ctx.lineJoin = this.lijnstijl;
            ctx.beginPath();
            ctx.moveTo(this.punten[0].x, this.punten[0].y);
            for(let i = 1; i<this.punten.length;i++){
                ctx.lineTo(this.punten[i].x,this.punten[i].y)
            }
            ctx.closePath();
            if (vullen === true) {ctx.fill()}
            ctx.stroke();
        }
    }
}

let mijnCirkel = (c) => {
   let middelpunt = new Punt(400,400);
   let bol = new Cirkel(middelpunt, 40, "purple","cyan",false);
   bol.teken(c);

};

function bubbles(c, aantal)  {
    let Cbreedte = c.width;
    let Choogte = c.height;

    let aantalRij = aantal;
    let aantalKolom = aantalRij;

    let perRij = Cbreedte/aantalRij;
    let perKolom = Choogte/aantalKolom;


    let straal = perRij/2;
    let R = 0;
    let G = 0;
    let B = 0;




    for (let i=0; i < Cbreedte; i += perRij) {
        for (let j=0; j < Choogte; j += perKolom) {
            let middelpunt_x = straal+i;
            let middelpunt_j = straal+j;
            let middelpunt = new Punt(middelpunt_x,middelpunt_j);


            R += 31;
            B += 31;
            G += 31;

            let kleur = rgb(R,G,B);



            let bol = new Cirkel(middelpunt, straal, kleur, kleur, true);
            bol.teken(c);
        }
    }


}

function mijnVeelhoek(c) {
    /* instantie van een veelhoek */
    let p1 = new Punt(400,15);
    let p2 = new Punt(207,729);
    let p3 = new Punt(729,207);
    let p4 = new Punt(11,397);
    let p5 = new Punt(735,592);
    let p6 = new Punt(208,63);
    let p7 = new Punt(400,782);
    let p8 = new Punt(590,63);
    let p9 = new Punt(61,589);
    let p10 = new Punt(790,396);
    let p11 = new Punt(64,204);
    let p12 = new Punt(594,729);


    let v = new Veelhoek([p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12],"red","white");
    v.teken(c, false);

}


let rgb = (r,g,b) => {
    r = (r > 255 || r < 0 )?0:r;
    g = (g > 255 || g < 0  )?0:g;
    b = (b > 255 || b < 0 )?0:b;
    return "rgb(" + r + "," + g + "," + b + ")";
};