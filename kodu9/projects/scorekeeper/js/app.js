/*
By: Markus Tammeoja
Some other features I could try implementing to learn more:
- player username inputs
- fireworks??????
- support for up to 4 players??????????????????????
*/
const limit = document.querySelector("#limit");
const reset = document.querySelector("#reset");
const button = document.querySelector('form button');
const play = document.querySelector('#play')
const stateContainer = document.querySelector('#inputs')
let scoreToWin = 5;
let isGameActive = false
let winMessage = document.createElement('h1');
let timer = document.createElement('h1');
timer.style.transition = 'all 1s';
let header = document.querySelectorAll('#header span');
let watch = new stopWatch(timer);

const p1 = {
    score: 0,
    button: document.querySelector('#p1point'),
    display: document.querySelector('#player1 h1'),
    name: 'Player 1',
}
const p2 = {
    score: 0,
    button: document.querySelector('#p2point'),
    display: document.querySelector('#player2 h1'),
    name: 'Player 2',
}
function stopWatch(elem) {
    let time = 0;
    let interval;
    let offset;
    function update() {
        if (this.isOn) {
            time += timePassed();
        }
        let formattedTime = timeFormat(time);
        elem.innerText = formattedTime;
    }
    function timePassed() {
        let now = Date.now();
        let timePassed = now - offset;
        offset = now;
        return timePassed;
    }
    function timeFormat(milliseconds) {
        let time = new Date(milliseconds);
        let minutes = time.getMinutes().toString();
        let seconds = time.getSeconds().toString();
        let ms = time.getMilliseconds().toString();

        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }
        if (seconds.length < 2) {
            seconds = '0' + seconds;
        }
        while (ms.length < 3) {
            ms = '0' + ms;
        }
        return `${minutes} : ${seconds} . ${ms}`;
    }
    this.isOn = false;
    this.start = () => {
        if (!this.isOn) {
           interval = setInterval(update.bind(this), 10);
           offset = Date.now();
           this.isOn = true;
        }
    }

    this.stop = () => {
        if (this.isOn) {
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }
    }

    this.reset = () => {
        time = 0;
    }
}

function updateScores(player, opponent) {
    if (isGameActive) {
        player.score++
        player.display.innerText = `${player.score}`
    }
    if (player.score == scoreToWin) {
        winMessage.removeAttribute('class','hidden');
        winMessage.innerText = `${player.name} won!`;
        stateContainer.appendChild(winMessage);
        isGameActive = false;
        player.button.disabled = true;
        opponent.button.disabled = true;
        player.button.style.backgroundColor = 'gold';
        watch.stop();
    }
    console.log(`${player.name}: ${player.score}`);
}

p1.button.addEventListener('click', () => {
    updateScores(p1, p2);
});
p2.button.addEventListener('click', () => {
    updateScores(p2, p1);
});

play.addEventListener('click', (e) => {
    e.preventDefault();
    if (limit.value == "") {
        play.innerText = "Insert amount of plays!";
        play.style.backgroundColor = 'rgb(237, 83, 109)';
        play.style.transition = 'all 0.5s';
        setTimeout(() => {
            play.innerText = "Play";
            play.style.backgroundColor = 'mediumturquoise';
            play.onmouseover = () => {
                play.style.backgroundColor = 'rgb(86, 185, 231';
            }
            play.onmouseleave = () => {
                play.style.backgroundColor = 'mediumturquoise';
            }
        }, 2000);
    } else {
        timer.removeAttribute('class', 'hidden');
        isGameActive = true;
        play.toggleAttribute('hidden');
        scoreToWin = limit.value;
        p1point.disabled = false;
        p2point.disabled = false;
        stateContainer.appendChild(timer);
        watch.start();
    }
});

reset.addEventListener('click', (e) => {
    e.preventDefault();
    isGameActive = false;
    for (let p of [p1, p2]) {
        p.button.disabled = true;
        p.score = 0;
        p.display.innerText = 0;
        p.button.style.backgroundColor = 'lightgreen';
    }
    play.removeAttribute('hidden');
    winMessage.setAttribute('class', 'hidden');
    scoreToWin = limit.value;
    timer.setAttribute('class', 'hidden');
    watch.stop();
    watch.reset();
});

/* My text colorizer than didn't work :/
function colorizeText(element) {
    const colors = ['75cfb8','bbdfc8','f0e5d8','ffc478','ffee93','f5d782','e97878','9b5151','ef4f4f','ee9595','ffcda3','74c7b8']
    for (let i = 0; i < element.length; i++) {
        let num = Math.floor(Math.random() * (colors.length+1))
        element[i].style.color = colors[num];
    }
}*/
