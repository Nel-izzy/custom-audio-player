const musicContainer = document.getElementById("music-container");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const imgCover = document.getElementById("cover");
const title = document.getElementById("title");
const audio = document.getElementById("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const timestamp = document.getElementById("timestamp");

// List of songs
const songs = ["hey", "summer", "ukulele"];

// keep track of songs
let songIndex = 2;

// initially load song to DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  imgCover.src = `images/${song}.jpg`;
}

// play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickedLength = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickedLength / width) * duration;
}

const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
};

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
});
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  let mins = Math.floor(audio.currentTime / 60);
  mins = mins < 10 ? 0 + String(mins) : mins;
  let secs = Math.floor(audio.currentTime % 60);
  secs = secs < 10 ? 0 + String(secs) : secs;

  timestamp.innerHTML = `${mins}:${secs}`;
});

audio.addEventListener("ended", nextSong);

progressContainer.addEventListener("click", setProgress);
