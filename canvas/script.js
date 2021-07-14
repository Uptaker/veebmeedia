let canvas;
let ctx;

function init_draw() {
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");

    drawRect();
    drawCircle();
    drawLine();
    drawPacman();
}

function drawRect() {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 6;
    ctx.fillStyle = "#FFAAAA";

    //x, y, z, h
    ctx.beginPath();
    ctx.rect((canvas.width - 200) / 2, (canvas.height - 100) / 2, 200, 100);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "green";
    ctx.fillStyle = "#AAFFAA";
    ctx.beginPath();
    ctx.rect((canvas.width - 200) / 2 + 212, (canvas.height - 100) / 2, 200, 100);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "magenta";
    ctx.strokeRect((canvas.width - 200) / 2, (canvas.height - 100) / 2 - 100 - 12, 200, 100);
    ctx.fillStyle = "#FFFF00";
    ctx.fillRect((canvas.width - 200) / 2, (canvas.height - 100) / 2 + 100 + 12, 200, 100);
}

function drawCircle() {
    ctx.beginPath();
    ctx.fillStyle = "lightblue";
    ctx.strokeStyle = "blue";
    ctx.arc(canvas.width / 2, canvas.height / 2, 120, 0, 360);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function drawLine() {
    ctx.beginPath();
    // ctx.fillStyle = "gray";
    ctx.strokeStyle = "black";
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 200);
    ctx.quadraticCurveTo(480, 270, 200, 360);
    ctx.bezierCurveTo(400, 400, 0, 450, 200, 540);
    // ctx.arc(canvas.width / 2, canvas.height / 2, 120, 0, 360);
    ctx.stroke();
    ctx.closePath();
}

function drawPacman() {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(800, 110, 100, .1 * Math.PI, 1.9 * Math.PI);
    ctx.lineTo(800, 110);

    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

init_draw();