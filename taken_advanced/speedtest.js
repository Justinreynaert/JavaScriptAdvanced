window.onload = function() {


    let aWaarden = bigArray();


    console.time('Loop'); // Loop = sneller bij GROTE arrays
    let totaalLoop = getTotaalLoop(aWaarden);
    console.timeEnd('Loop');

    console.time('Reduce'); // Reduce = sneller bij kleine arrays
    let totaalReduce = getTotaalReduce(aWaarden);
    console.timeEnd('Reduce');

    console.time('For'); // Reduce = sneller bij kleine arrays
    let totaalFor = getTotaalFor(aWaarden);
    console.timeEnd('For');

    // reduce faster

};

function bigArray() {
    aBig = [];
    aantal = 1000;

    for (let i = 0; i < aantal; i++) {
        aBig.push(i);
    }

    return aBig;
}

function getTotaalReduce(arr) {
    return totaal = arr.reduce(function(a,b) {
        return a + b;
    }, 0);


}

function getTotaalLoop(arr) {
    let totaal = 0;
    for (let i = 0; i < arr.length; i++) {
        totaal += arr[i];
    }
    return totaal;
}

function getTotaalFor(arr) {
    let t  = 0;
    arr.forEach(function(v,i,arr){
        t+=v;
    });
    return t;
}


