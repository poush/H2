// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let {clipboard, ipcRenderer} = require('electron')
let player;

// promise for loading Youtube Api
let apiPromise  = new Promise(resolve => {
  window.onYouTubeIframeAPIReady = () => {
//     console.log("YouTube API loaded");
    resolve();
  }
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});


async function putYoutube (videoId) {

    await apiPromise
    player = new YT.Player(document.querySelector("#video"), {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: { 'autoplay': 1},
      events: {
        onReady: (event) => {
        // console.log(event)
        },
        onStateChange: (event) => {
          // console.log(event)
        }
      }
    });
}

function pause() {
 if(player) {
   player.pauseVideo()
 }else {
  alert("Play a video first");
 }
}
 
function play() {
  if(player) {
    player.playVideo()
  }else {
   alert("Play a video first");
  }
 }


ipcRenderer.on('pause', (ev, arg) => {
	pause()
})

ipcRenderer.on('play', (ev, arg) => {
	play()
})

ipcRenderer.on('youtube', (ev, arg) => {
	putYoutube(arg)
}) 

ipcRenderer.on('invalidUrl', () => {
	alert('Oops! This isn\'t supported URL')
})