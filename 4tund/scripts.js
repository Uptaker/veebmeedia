let paused = false;
let heliSpeed = 5
let windSpeed = 1;

window.onload = function() {
    document.getElementById("anim").addEventListener("click", toggleAnims);
    document.querySelector(".heli").addEventListener("animationiteration", makeHeliSlow);
    document.querySelector(".heli").addEventListener("transitionend", makeWindMillFast);
}

function makeHeliSlow() {
    heliSpeed+=5;
    document.querySelector(".heli").style.animationDuration = `${heliSpeed}s`;
}

function makeWindMillFast() {
    windSpeed+=5;
    document.querySelector(".wind").style.animationDuration = `${windSpeed}s`;
}

function toggleAnims() {
    if (paused) {
        document.querySelector(".heli").style.animationPlayState = "running";
        document.querySelector(".front_wheel").style.animationPlayState = "running";
        document.querySelector(".front_wheel2").style.animationPlayState = "running";
        document.querySelector(".rear_wheel").style.animationPlayState = "running";
        document.querySelector(".rear_wheel2").style.animationPlayState = "running";
        document.querySelector(".wind").style.animationPlayState = "running";
        paused = false;
    } else {
        document.querySelector(".heli").style.animationPlayState = "paused";
        document.querySelector(".front_wheel").style.animationPlayState = "paused";
        document.querySelector(".front_wheel2").style.animationPlayState = "paused";
        document.querySelector(".rear_wheel").style.animationPlayState = "paused";
        document.querySelector(".rear_wheel2").style.animationPlayState = "paused";
        document.querySelector(".wind").style.animationPlayState = "paused";
        paused = true;
    }

}


function toggleAnim() {
    // console.log(document.getElementById("truckarea").style.animationPlayState);
    let allItems = document.getElementById("stage").getElementsByTagName("*");
    // console.log(allItems);
    if (document.getElementById("anim").innerHTML == "Käivita animatsioon") {
        document.getElementById("anim").innerHTML = "Peata animatsioon";
        // document.getElementById("truckarea").style.animationPlayState = "running";
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].style.animationPlayState = "running";
        }
    } else {
        document.getElementById("anim").innerHTML = "Käivita animatsioon"
        // document.getElementById("truckarea").style.animationPlayState = "paused";
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].style.animationPlayState = "paused";
        }
    }
}

function animInfo(e) {
    let randomDuration = 8 + Math.round(Math.random() * (13 - 8));
    let randomDelay = 1 + Math.round(Math.random() * (6 - 1));
    let night = document.getElementById("night");
    let carcone = document.querySelector(".carcone");
    let truckcone = document.querySelector(".truckcone");
    if (e.type == "animationend") {
        // console.log(e.animationName);
        // console.log(e.target.id);
        if (e.target.id == "truckarea" || e.target.id == "cararea") {
            e.target.style.animationDelay = randomDelay + "s";
            e.target.style.animationDuration = randomDuration + "s";
            if (e.animationName == "drive") {
                e.target.style.animationName = "driveback";
            } else {
                e.target.style.animationName = "drive";
            }
        }

        if (e.target.id == "cararea") {
            carcone.style.display = "none";
        }

        if (e.target.id == "truckarea") {
            truckcone.style.display = "none";
        }
    }


    if (e.type == "animationstart" && e.target.id == "cararea") {
        carcone.style.display = "block";
    }

    if (e.type == "animationstart" && e.target.id == "truckarea") {
        truckcone.style.display = "block";
    }

    if (e.type == "animationiteration" && e.target.id == "wm_wings") {
        counter++;
        if (counter % 2 == 0) {
            if(night.style.opacity == 0) {
                night.style.opacity = 0.8;
            } else {
                night.style.opacity = 0;
                carcone.style.opacity = 0;
                truckcone.style.opacity = 0;
            } 
        }
    }

    if (e.type == "transitionend") {
        if(night.style.opacity != 0) {
            carcone.style.opacity = 1;
            truckcone.style.opacity = 1;
        }
    }
}