let canvas;
let ctx;
let tempUnit;
let timeUnit;

window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    //nihutan graafika contexti
    ctx.translate(0, canvas.height / 2);
    ctx.scale(1, -1);
    // arvutan ühikud
    tempUnit = Math.floor(canvas.height / 60);
    timeUnit = Math.floor(canvas.width / avg_temp.length + 1);
    draw_center();
    draw_graph();
}

function draw_center() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();
    ctx.closePath();
}

function draw_graph() {
    ctx.strokeStyle = "gray";
    ctx.beginPath();
    ctx.moveTo(timeUnit, avg_temp[0][2] * tempUnit);
    for (let i = 1; i < avg_temp.length; i++) {
        ctx.lineTo(timeUnit * (i + 1), avg_temp[i][2] * tempUnit);
    }
    ctx.stroke();
    ctx.closePath();
}