let canvas;
let context;
let hwCanvas
let ctx;

function init_draw() {
    canvas = document.querySelector("#canvas");
    context = canvas.getContext("2d");
    hwCanvas = document.querySelector("#hwcanvas");
    ctx = hwCanvas.getContext("2d");

    drawRect();
    drawCircle();
    drawLine();
    drawPacman();

    drawHouse()
}

function drawHouse() {
    ctx.fillStyle="#975B5B";
    ctx.strokeStyle="black";
    ctx.lineWidth="3";
    ctx.save();

    // katus
    ctx.beginPath();
    ctx.moveTo(100,260);
    ctx.lineTo(300,10);
    ctx.lineTo(500,260);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // seinad
    ctx.fillRect(100, 260, 400, 300);
    ctx.strokeRect(100, 260, 400, 300);

    // aknad
    ctx.fillStyle="black";
    ctx.fillRect(130, 300, 70, 45);
    ctx.fillRect(205, 300, 70, 45);
    ctx.fillRect(325, 300, 70, 45);
    ctx.fillRect(400, 300, 70, 45);
    ctx.fillRect(130, 350, 70, 45);
    ctx.fillRect(205, 350, 70, 45);
    ctx.fillRect(325, 350, 70, 45);
    ctx.fillRect(400, 350, 70, 45);
    ctx.fillRect(325, 425, 70, 45);
    ctx.fillRect(400, 425, 70, 45);
    ctx.fillRect(325, 475, 70, 45);
    ctx.fillRect(400, 475, 70, 45);

    // uks
    ctx.beginPath();
    ctx.restore();
    ctx.moveTo(200, 423);
    ctx.lineTo(200, 560);
    ctx.moveTo(140,433);
    ctx.lineTo(140, 560);
    ctx.moveTo(260,434);
    ctx.lineTo(260, 560);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(199,562,140,1.355*Math.PI,1.65*Math.PI); // door arc
    ctx.stroke();

    // muru
    ctx.strokeStyle="green";
    let border = 0;
    ctx.beginPath();
    while(border <= hwCanvas.width) {
        ctx.moveTo(border, hwCanvas.height);
        ctx.quadraticCurveTo(5, hwCanvas.height - 20, border + 2, hwCanvas.height);
        border += 5;
        ctx.lineTo(border, hwCanvas.height);
    }
    ctx.stroke();
}

function drawRect() {
    context.strokeStyle = "red";
    context.lineWidth = 6;
    context.fillStyle = "#FFAAAA";

    //x, y, z, h
    context.beginPath();
    context.rect((canvas.width - 200) / 2, (canvas.height - 100) / 2, 200, 100);
    context.closePath();
    context.fill();
    context.stroke();

    context.strokeStyle = "green";
    context.fillStyle = "#AAFFAA";
    context.beginPath();
    context.rect((canvas.width - 200) / 2 + 212, (canvas.height - 100) / 2, 200, 100);
    context.closePath();
    context.fill();
    context.stroke();

    context.strokeStyle = "magenta";
    context.strokeRect((canvas.width - 200) / 2, (canvas.height - 100) / 2 - 100 - 12, 200, 100);
    context.fillStyle = "#FFFF00";
    context.fillRect((canvas.width - 200) / 2, (canvas.height - 100) / 2 + 100 + 12, 200, 100);
}

function drawCircle() {
    context.beginPath();
    context.fillStyle = "lightblue";
    context.strokeStyle = "blue";
    context.arc(canvas.width / 2, canvas.height / 2, 120, 0, 360);
    context.closePath();
    context.stroke();
    context.fill();
}

function drawLine() {
    context.beginPath();
    // context.fillStyle = "gray";
    context.strokeStyle = "black";
    context.moveTo(100, 0);
    context.lineTo(100, 200);
    context.quadraticCurveTo(480, 270, 200, 360);
    context.bezierCurveTo(400, 400, 0, 450, 200, 540);
    // context.arc(canvas.width / 2, canvas.height / 2, 120, 0, 360);
    context.stroke();
    context.closePath();
}

function drawPacman() {
    context.beginPath();
    context.fillStyle = "yellow";
    context.arc(800, 110, 100, .1 * Math.PI, 1.9 * Math.PI);
    context.lineTo(800, 110);

    context.stroke();
    context.fill();
    context.closePath();
}

init_draw();