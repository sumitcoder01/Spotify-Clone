console.log("Welcome to Spotify");
//Initilizing Variables----

let songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg" },
];
let songindex = 0;
let masterplay = document.getElementsByClassName('masterplay')[0];
let progressbar = document.getElementById("progressbar");
let songlist = Array.from(document.getElementsByClassName('songitem'));
let previous = document.getElementsByClassName("previous")[0];
let next = document.getElementsByClassName("next")[0];
let gif = document.getElementById('gif');
let mastersongname = document.getElementById("mastersong");
let audioElement = new Audio();
//List Initilization
function update() {
    audioElement.src = `songs/${songindex + 1}.mp3`;
    mastersongname.innerText = `${songs[songindex].songName}`;
    audioElement.currentTime = 0;
    progressbar.value = 0;
    gif.style.opacity = "0";
    document.getElementById(`${songindex + 1}`).classList.add('fa-pause-circle-o');
    document.getElementById(`${songindex + 1}`).classList.remove('fa-play-circle-o');
}
function makeAllPlays() {
    songlist.forEach(element => {
        element.getElementsByTagName('i')[0].classList.remove('fa-pause-circle-o');
        element.getElementsByTagName('i')[0].classList.add('fa-play-circle-o');
    });
}
update();
makeAllPlays();
songlist.forEach((element, index) => {
    element.getElementsByTagName('img')[0].src = songs[index].coverPath;
    element.getElementsByClassName("songname")[0].innerHTML = songs[index].songName;
    element.getElementsByTagName('i')[0].addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            songindex = index;
            update();
            audioElement.play();
            gif.style.opacity = "1";
            makeAllPlays();
            element.getElementsByTagName('i')[0].classList.remove('fa-play-circle-o');
            element.getElementsByTagName('i')[0].classList.add('fa-pause-circle-o');
            masterplay.classList.remove('fa-play-circle-o');
            masterplay.classList.add('fa-pause-circle-o');
        }
        else {
            audioElement.pause();
            masterplay.classList.remove('fa-pause-circle-o');
            masterplay.classList.add('fa-play-circle-o');
            element.getElementsByTagName('i')[0].classList.remove('fa-pause-circle-o');
            element.getElementsByTagName('i')[0].classList.add('fa-play-circle-o');
            gif.style.opacity = "0";
        }
    });
});
masterplay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle-o');
        masterplay.classList.add('fa-pause-circle-o');
        gif.style.opacity = "1";
        document.getElementById(`${songindex + 1}`).classList.remove('fa-play-circle-o');
        document.getElementById(`${songindex + 1}`).classList.add('fa-pause-circle-o');
    }
    else {
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle-o');
        masterplay.classList.add('fa-play-circle-o');
        gif.style.opacity = "0";
        document.getElementById(`${songindex + 1}`).classList.remove('fa-pause-circle-o');
        document.getElementById(`${songindex + 1}`).classList.add('fa-play-circle-o');
    }
});
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progressbar.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);
});
progressbar.addEventListener('change', () => {
    audioElement.currentTime = progressbar.value * audioElement.duration / 100;
});
previous.addEventListener("click", () => {
    if (songindex != 0) {
        document.getElementById(`${songindex + 1}`).classList.remove('fa-pause-circle-o');
        document.getElementById(`${songindex + 1}`).classList.add('fa-play-circle-o');
        songindex -= 1;
        update();
        audioElement.play();
        masterplay.classList.remove('fa-play-circle-o');
        masterplay.classList.add('fa-pause-circle-o');
        gif.style.opacity = "1";
    }
});
next.addEventListener("click", () => {
    document.getElementById(`${songindex + 1}`).classList.remove('fa-pause-circle-o');
    document.getElementById(`${songindex + 1}`).classList.add('fa-play-circle-o');
    if (songindex != 9) {
        songindex += 1;
    }
    else {
        songindex = 0;
    }
    update();
    audioElement.play();
    masterplay.classList.remove('fa-play-circle-o');
    masterplay.classList.add('fa-pause-circle-o');
    gif.style.opacity = "1";
});