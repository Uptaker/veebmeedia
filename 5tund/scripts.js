let message = "Hello there, young one";
console.log(message);

window.onload = function () {
    clockTick();
    setInterval(displayTime, 1000);
    randomPic();
}

function randomPic() {
    let rand = Math.floor(Math.random() * 4) + 1;
    let img = document.createElement("img");
    img.src = `../images/5tund/${rand}.jpg`;
    img.alt = 'random picture';
    document.querySelector('#pic').append(img);
}

function displayTime() {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    h = format(h);
    m = format(m);
    s = format(s);
    function format(t) {
        if (t < 10) {
            return `0${t}`;
        }
        return t;
    }
    msg = `${h} : ${m} : ${s}`;
    document.querySelector('#openMessage').innerHTML = msg;
}
setInterval(displayTime, 1000);
randomPic();

function clockTick() {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let secangle = s * 6;
    let mangle = m * 6;
    let hangle = (h * 30) + (m * 0.5);
    document.querySelector('#secondhand').style.transform = `rotate(${secangle}deg)`;
    document.querySelector('#minutehand').style.transform = `rotate(${mangle}deg)`;
    document.querySelector('#hourhand').style.transform = `rotate(${hangle}deg)`;
    requestAnimationFrame(clockTick);
}
