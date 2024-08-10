let songEl = document.querySelector(".main-body");
let songNavigation = document.querySelector(".footer .navigation");
songNavigation.addEventListener("click", clickPlayFooter);
songEl.addEventListener("click", clickPlay);

let footerPlayBtn = document.querySelector(".footer-play");

let prevSongName = "None";

let songArrParent = document.querySelectorAll(".main-body-song");

let progressBar = document.querySelector(".progress-bar");
progressBar.addEventListener("input", updateSongTime);

let currSong = 0;
let progressIntervalId = null;
function addSongNameToFooter(songName) {
  let songNameEl = document.querySelector(".song-name");
  songNameEl.textContent = songName;
  prevSongName = songName;
}
function clickPlay(e) {
  const btn = e.target;
  let btnParent = btn.parentNode;
  // console.log(btnParent);
  // console.log([...songArrParent], [...songArrParent].indexOf(btnParent));
  currSong = [...songArrParent].indexOf(btnParent);
  let newSongName = btnParent.children[1].textContent;
  if (newSongName !== prevSongName) addSongNameToFooter(newSongName);
  let audioEl = btnParent.querySelector("audio");
  if (btn.tagName === "SPAN" && btn.textContent === "▶️") {
    clearInterval(progressIntervalId);
    progressIntervalId = setInterval(() => {
      progressChange(audioEl);
    }, 1000);

    changeFooterBtn(1);
    const pauseEl = btn.nextElementSibling;
    audioEl.play();
    // console.log(pauseEl, "pause");
    btn.classList.add("hide");
    pauseEl.classList.remove("hide");
    hideAllPauseBtn(pauseEl);
  }

  if (btn.tagName === "SPAN" && btn.textContent === "⏸️") {
    clearInterval(progressIntervalId);
    changeFooterBtn(0);
    const playEl = btn.previousElementSibling;
    btn.classList.add("hide");
    playEl.classList.remove("hide");
    audioEl.pause();
  }
}
function changeSongPlayBtnInList(btn, prev, curr) {
  if (btn === "▶️") {
    songArrParent[currSong]
      .querySelectorAll(".song-btn")[1]
      .classList.remove("hide");
    songArrParent[currSong]
      .querySelectorAll(".song-btn")[0]
      .classList.add("hide");
  } else if (btn === "⏸️") {
    songArrParent[currSong]
      .querySelectorAll(".song-btn")[0]
      .classList.remove("hide");
    songArrParent[currSong]
      .querySelectorAll(".song-btn")[1]
      .classList.add("hide");
  } else {
    console.log(prev, curr, "prev");
    console.log(prev[0].outerHTML, prev[1].outerHTML, " CURR");
    prev[0].classList.remove("hide");
    prev[1].classList.add("hide");
    curr[1].classList.remove("hide");
    curr[0].classList.add("hide");
  }
}
function hideAllPauseBtn(btn) {
  let pauseBtnArr = document.querySelectorAll(
    ".main-body-song span:nth-child(5)"
  );
  for (let pauseBtn of pauseBtnArr) {
    if (pauseBtn !== btn && !pauseBtn.classList.contains("hide")) {
      let btnParent = pauseBtn.parentNode;
      let audioEl = btnParent.querySelector("audio");
      audioEl.pause();
      let playBtn = pauseBtn.previousElementSibling;
      playBtn.classList.remove("hide");
      pauseBtn.classList.add("hide");
    }
    // console.log(pauseBtn);
  }
}
function changeFooterBtn(val) {
  if (val) {
    footerPlayBtn.textContent = "⏸️";
  } else footerPlayBtn.textContent = "▶️";
}
function clickPlayFooter(e) {
  const btn = e.target;
  if (currSong == null) {
    alert("SELECT SONG FROM LIST");
  }
  // console.log(btn, currSong);
  if (btn.tagName === "SPAN" && currSong !== null) {
    if (btn.textContent === "▶️") {
      clearInterval(progressIntervalId);
      progressIntervalId = setInterval(() => {
        progressChange(songArrParent[currSong].querySelector("audio"));
      }, 1000);

      // console.log(songArrParent[currSong].querySelector("audio"));
      footerPlayBtn.textContent = "⏸️";
      // console.log(
      //   songArrParent[currSong].querySelectorAll(".song-btn"),
      //   "brooo"
      // );
      changeSongPlayBtnInList("▶️");

      songArrParent[currSong].querySelector("audio").play();
    } else if (btn.textContent === "⏸️") {
      clearInterval(progressIntervalId);
      footerPlayBtn.textContent = "▶️";
      changeSongPlayBtnInList("⏸️");
      songArrParent[currSong].querySelector("audio").pause();
    } else if (btn.textContent === "➡️") {
      clearInterval(progressIntervalId);
      progressIntervalId = setInterval(() => {
        progressChange(songArrParent[currSong].querySelector("audio"));
      }, 1000);
      footerPlayBtn.textContent = "⏸️";
      let prevSong = currSong;
      currSong++;
      if (currSong >= songArrParent.length) currSong = 0;
      changeSongPlayBtnInList(
        null,
        songArrParent[prevSong].querySelectorAll(".song-btn"),
        songArrParent[currSong].querySelectorAll(".song-btn")
      );
      playAudio(prevSong, currSong);
    } else if (btn.textContent === "⬅️") {
      clearInterval(progressIntervalId);
      progressIntervalId = setInterval(() => {
        progressChange(songArrParent[currSong].querySelector("audio"));
      }, 1000);
      footerPlayBtn.textContent = "⏸️";
      let prevSong = currSong;
      currSong--;
      if (currSong < 0) currSong = songArrParent.length - 1;
      changeSongPlayBtnInList(
        null,
        songArrParent[prevSong].querySelectorAll(".song-btn"),
        songArrParent[currSong].querySelectorAll(".song-btn")
      );
      playAudio(prevSong, currSong);
    }
  }
}

function playAudio(prevSong, currSongInd) {
  songArrParent[prevSong].querySelector("audio").pause();
  songArrParent[currSongInd].querySelector("audio").play();
  document.querySelector(".song-name").textContent =
    songArrParent[currSong].querySelectorAll("span")[0].textContent;
  // console.log(songArrParent[currSong].querySelectorAll("span")[0]);
}

function progressChange(audioEl) {
  const duration = audioEl.duration;
  const currTime = audioEl.currentTime;
  let played = currTime / duration;
  played *= 100;
  console.log(played, " played");
  let progressBar = document.querySelector(".progress-bar");
  progressBar.value = played;
}
function getAudioEl() {
  let songName = document.querySelector(".song-name").textContent;
  for (let songP of songArrParent) {
    let nameEl = songP.querySelector("span");
    // console.log(nameEl.textContent, songName, " bro**");
    if (nameEl.textContent === songName) {
      return songP.querySelector("audio");
    }
  }
}
function updateSongTime(e) {
  console.log(progressBar.value);
  clearInterval(progressIntervalId);
  let audioEl = getAudioEl();
  let currTime = audioEl.duration * (progressBar.value / 100);
  console.log(currTime, " audio", audioEl.duration);
  audioEl.currentTime = currTime;
  if (audioEl.paused) {
    progressChange(audioEl);
    clearInterval(progressIntervalId);
    return;
  }
  progressIntervalId = setInterval(() => {
    progressChange(audioEl);
  }, 1000);
}
