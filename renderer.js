// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let { clipboard, ipcRenderer } = require("electron");
import notif from "./lib/notifications";

let player;

// promise for loading Youtube Api
let apiPromise = new Promise(resolve => {
  window.onYouTubeIframeAPIReady = () => {
    //     console.log("YouTube API loaded");
    resolve();
  };
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

async function putYoutube(videoId) {
  await apiPromise;
  player = new YT.Player(document.querySelector("#video"), {
    height: "100%",
    width: "100%",
    videoId: videoId,
    playerVars: { autoplay: 1 },
    events: {
      onReady: event => {
        // console.log(event)
      },
      onStateChange: event => {
        // console.log(event)
      }
    }
  });
  document.body.innerHTML += `<button onclick="location.reload()" style="cursor:pointer;border:none;background:none;z-index:999999;margin:60vh 82% 0 0;opacity:.5;font-weight:800"><svg version="1.1" id="h2-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 27 25"  xml:space="preserve"><g><circle class="white" cx="13.5" cy="22.8" r="2.1"></circle><polygon class="white" points="13.5,0 0,11.2 0,24.6 2.8,24.6 2.8,12.5 13.5,3.7 24.2,12.5 24.2,24.6 27,24.6 27,11.2 	"></polygon></g></svg></button>`;
}

function pause() {
  if (player) {
    player.pauseVideo();
  } else {
    alert("Play a video first");
  }
}

function play() {
  if (player) {
    player.playVideo();
  } else {
    alert("Play a video first");
  }
}

function defaultiFrame(arg) {
  alert("sds");
  let web = `<iframe src="${arg}" frameborder="0" sandbox="allow-scripts allow-popups allow-forms allow-same-origin" allowfullscreen="" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; border-radius: 1px; pointer-events: auto; background-color: rgb(247, 246, 245);"></iframe>`;
  document.querySelector("#video").innerHTML = web;
}

ipcRenderer.on("pause", (ev, arg) => {
  pause();
});

ipcRenderer.on("play", (ev, arg) => {
  play();
});

ipcRenderer.on("youtube", (ev, arg) => {
  putYoutube(arg);
});

ipcRenderer.on("googleDocs", (ev, arg) => {
  defaultiFrame(arg);
});

ipcRenderer.on("invalidUrl", () => {
  notif("Oops! This isn't supported URL");
});

ipcRenderer.on("alertUser", (event, message, url) => {
  var userInput = confirm(message);
  if (userInput == true) {
    alert(
      `Step 1. Copy the URL\nStep 2. Open in your favorite browser.\n\n${url}`
    );
  }
});
