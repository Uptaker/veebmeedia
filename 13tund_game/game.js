let canvas;
let ctx;
let ball_list = [];
let elements_limit = 10;
let game_alphabet = [];
let hit_count = 0;
let miss_count = 0;
let wrong_count = 0;
let startAudio = new Audio("CrabRave.mp3");
let missAudio = new Audio("Nope.mp3");
let rightAudio = new Audio("Yes.mp3");
let started = false;

// kõik nüüd valmis!

window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	document.querySelector("#startGame").addEventListener("click", init_game);
	document.querySelector("#mute").addEventListener("click", mute);
	document.querySelector("#unmute").addEventListener("click", unmute);
}

function mute() {
	startAudio.pause();
}

function unmute() {
	startAudio.play();
}

function randomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.8)`;
}

function init_game(){
    if (!started) {
        startAudio.currentTime = 38;
        startAudio.volume = 0.3;
        startAudio.play();
        add_elements();
        canvas.addEventListener("mousedown", check_hits);
        started = true;

    } else {
        document.querySelector("#startGame").innerHTML = "Lõpeta";
        startAudio.pause();
        started = false;
        ball_list = [];
        hit_count = 0;
        miss_count = 0;
        wrong_count = 0;
        game_alphabet = [];
    }

}

function add_elements(){
	let base_alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "Š", "Z", "Ž", "T", "U", "V", "W", "Õ", "Ä", "Ö", "Ü", "X", "Y"];
	//loosime soovitud arvu tähti
	game_alphabet = base_alphabet.slice(0);
	while(game_alphabet.length > elements_limit){
		let one_to_remove = Math.round(Math.random() * (game_alphabet.length - 1));
		game_alphabet.splice(one_to_remove, 1);
	}
	console.log(game_alphabet);
	let x = canvas.width / 2;
	let y = canvas.height / 2;
	//let r = 15;
	for(let i = 0; i < elements_limit; i ++){
		let r = 15 + Math.round(Math.random() * 15);
		let symbol = game_alphabet[game_alphabet.length - 1 - i];
		ball_list.push(new Game_ball(x,y,r,symbol));
	}
	//move_1();
	//ball = new Game_ball(x,y,r);
	move_elements();
}

function move_elements(){
	canvas.width = canvas.width;
	
	//ball.move_self();
	//ball.draw_self();
	for(let i = 0; i < ball_list.length; i ++){
		ball_list[i].move_self();
		ball_list[i].draw_self();
	}
    draw_score();
    draw_missed();
    draw_wrong();
	if(ball_list.length > 0){
		requestAnimationFrame(move_elements);
	}
}

function check_hits(e){
	let m_x = e.clientX - canvas.offsetLeft + window.scrollX;
	let m_y = e.clientY - canvas.offsetTop + window.scrollY;
    let hit = false;
	for(let i = 0; i < ball_list.length; i ++){
		if(ball_list[i].was_hit(m_x, m_y)){
			if(ball_list[i].symbol == game_alphabet[hit_count]){
				//eemaldan selle elemendi
				ball_list.splice(i, 1);
				hit_count ++;
                hit = true;
                missAudio.pause();
                rightAudio.currentTime = 0;
                rightAudio.play();
				break;
			} else {

                wrong_count++;
            }
		}
	}
    if (!hit) {
        rightAudio.pause();
        missAudio.currentTime = 0;
        missAudio.play();
        miss_count++;
    }
}

function draw_score() {
    ctx.fillStyle = "black";
    //"bold 24px Verdana"
    ctx.font = "bold " + " 16" + "px Verdana";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`Score: ${hit_count}`, canvas.width / 2, canvas.height - 100);
}

function draw_wrong() {
    ctx.fillStyle = "black";
    //"bold 24px Verdana"
    ctx.font = "bold " + " 16" + "px Verdana";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`Wrong letter: ${wrong_count}`, canvas.width / 2, canvas.height - 70);
}

function draw_missed() {
    ctx.fillStyle = "black";
    //"bold 24px Verdana"
    ctx.font = "bold " + " 16" + "px Verdana";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`Missed: ${miss_count}`, canvas.width / 2, canvas.height - 40);
}

function pythagoras(b_x, b_y, m_x, m_y){
	return Math.sqrt(Math.pow(b_x - m_x, 2) + Math.pow(b_y - m_y,2));
}

class Game_ball{
	constructor(x,y,r,symbol){
		this.x = x;
		this.y = y; 
		this.r = r;
		this.symbol = symbol;
		this.speed_x = 0;
		this.speed_y = 0;
        this.color = randomColor();
		this.set_speed();
		this.draw_self();
	}
	
	draw_self(){
		ctx.fillStyle = this.color;
		ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
			ctx.fill();
		ctx.closePath();
		//lisame tähe
		ctx.fillStyle = "#FFFFFF";
		//"bold 24px Verdana"
		ctx.font = "bold " + Math.round(this.r * 1.4) + "px Verdana";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(this.symbol, this.x, this.y);
	}
	
	set_speed(){
		while(this.speed_x == 0 && this.speed_y == 0){
			//juhuslikud kiirused -5 ... 5
			this.speed_x = 5 - Math.round(Math.random()* 10);
			this.speed_y = 5 - Math.round(Math.random()* 10);
		}
	}
	
	move_self(){
		//ega pole servale jõudnud
		if(this.x <= this.r || this.x >= canvas.width - this.r){
			this.speed_x *= -1;
		}
		if(this.y <= this.r || this.y >= canvas.height - this.r){
			this.speed_y *= -1;
		}
		this.x += this.speed_x;
		this.y += this.speed_y;
	}
	
	was_hit(m_x, m_y){
		return pythagoras(this.x, this.y, m_x, m_y) <= this.r
	}
}//class lõppeb

function move_1(){
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = canvas.width;
	ctx.fillStyle = "#FFCC00";
	x += speed_x;
	y += speed_y;
	//ega pole servale jõudnud
	if(x <= r || x >= canvas.width - r){
		speed_x *= -1;
	}
	if(y <= r || y >= canvas.height - r){
		speed_y *= -1;
	}
	ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.fill();
	ctx.closePath();
	requestAnimationFrame(move_1);
}
