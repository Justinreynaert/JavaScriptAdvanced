window.onload = function () {
    var canvas = document.getElementById('canvas');
    rechthoeken(canvas);
};

function rechthoeken(c) {
    var ctx = c.getContext('2d');

    if(ctx) {
        ctx.fillStyle = "yellow";
        ctx.strokeStyle = "#000";
        ctx.fillRect(50,50,200,70); // x, y, breedte , hoogte
        ctx.strokeRect (80,80,200,70);
        ctx.clearRect(100,20,50,160);
    }
}