window.onload = function () {
    var canvas = document.getElementById('canvas');
    rechthoeken(canvas);
};

function rechthoeken(c) {
    var ctx = c.getContext('2d');

    if(ctx) {
        ctx.fillyStyle = "yellow";
        ctx.strokeStyle = "#000";
        ctx.fillRect(50,50,200,70); // x, y, breedte , hoogte
    }
}