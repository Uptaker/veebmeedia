let movie;
let title_mode = "hidden";//disabled   hidden  showing
let movie_title;
let title_num;

window.onload = function () {
    movie = document.getElementById("movie");
    console.log(movie.textTracks);
    movie.textTracks[0].mode = title_mode;
    title_num = 0;
    movie_title = movie.textTracks[0];
    document.getElementById("subtitleBtn").addEventListener("click", set_title);
    movie_title.addEventListener("cuechange", display_titles);
}

function set_title() {
    //movie.textTracks[0].mode = title_mode;
    movie_title.mode = "hidden";
    title_num++;
    if (title_num >= movie.textTracks.length) {
        title_num = 0;
    }
    movie_title = movie.textTracks[title_num];
    movie_title.mode = title_mode;
}

function display_titles() {
    let current_title = "";
    if (movie_title.activeCues.length > 0) {
        for (let i = 0; i < movie_title.activeCues.length; i++) {
            current_title += movie_title.activeCues[i].id + ": " + movie_title.activeCues[i].text;
        }
    }
    document.getElementById("subtitle_place").innerHTML = current_title;
}