
let degree = 0;
let total = 0;
let audio = new Audio("harjutus/tilkumine.mp3");

window.onload = function() {
    window.addEventListener("click", rotateCube);
    window.addEventListener("click", changeColor);
}

function rotateCube() {
    window.removeEventListener("click", rotateCube);
    let cube = document.getElementById("cube");
    if (degree == 360) {
        audio.play();
        degree = 0;
    }

    cube.style.transform = "rotateY(" + degree + "deg)";
    degree += 0.5;

    if (degree % 90 == 0) {
        total+= 1;
        addTotalRotationText(total);
    }
    requestAnimationFrame(rotateCube);
}

function addTotalRotationText(total) {
    document.querySelector("#front").innerHTML = `Veerandpöördeid:<br> ${total}`;
    document.querySelector("#back").innerHTML = `Veerandpöördeid:<br> ${total}`;
    document.querySelector("#left").innerHTML = `Veerandpöördeid:<br> ${total}`;
    document.querySelector("#right").innerHTML = `Veerandpöördeid:<br> ${total}`;
}

function changeColor() {
    let e = document.querySelector("#main-content");
    let h = Math.floor(Math.random() * 360) + 1;
    let s = Math.floor(Math.random() * 100) + 1;
    let l = Math.floor(Math.random() * 100) + 1;
    e.style.backgroundColor = `hsl(${h}, ${s}%,${l}%)`;
}