// todo
// pause of each song to do
// next song should play

console.log("Welcome to Spotify");  

//initialising variables
let songIndex = 0; 
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById(id= 'masterPlay');
let progressBar = document.getElementById(id= 'ProgressBar');
let bars_gif = document.getElementById(id= 'bars_gif');
let masterSongName = document.getElementById(id= 'masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem')); //forEach wokrs on Array

let songs = [
    {songName: "Warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "ABC", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "DEF", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "MNO", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "PQR", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "XYZ", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
]

songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; //shows the diff covers for diff songs
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; //shows the diff names for diff songs
})

// handling play and pause
masterPlay.addEventListener('click',() => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        bars_gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        bars_gif.style.opacity = 0;   
    }  
})
//event listening: timeupdate
audioElement.addEventListener('timeupdate',() => {
    //updating progress/seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    progressBar.value = progress; //percent value
})

//proper flow of sing with progress bar
progressBar.addEventListener('change',() => {
    audioElement.currentTime = (progressBar.value * audioElement.duration)/100;
})

const allPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

//songlist buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click',(e) => {
        allPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        bars_gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

//Next song button
document.getElementById('next').addEventListener('click',() => {
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`; 
    masterSongName.innerText = songs[songIndex].songName;  
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

//previous song button
document.getElementById('previous').addEventListener('click',() => {
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;     
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})