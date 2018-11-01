// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let { clipboard, ipcRenderer } = require('electron')
const notif = require('./lib/notifications')

let player;

// promise for loading Youtube Api
let apiPromise = new Promise(resolve => {
  window.onYouTubeIframeAPIReady = () => {
    //     console.log("YouTube API loaded");
    resolve();
  }
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  
  const vimeo = document.createElement('script');
  vimeo.src = "https://player.vimeo.com/api/player.js";

  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  firstScriptTag.parentNode.insertBefore(vimeo, firstScriptTag);
});


async function putYoutube(videoId) {

  await apiPromise
  player = new YT.Player(document.querySelector("#video"), {
    height: '100%',
    width: '100%',
    videoId: videoId,
    playerVars: { 
      'autoplay': 1,
      'fs': 0,
      'modestbranding': 1
    },
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
async function putVimeo(videoId) {

  await apiPromise
  var options = {
    id: videoId,
    autoplay: true,
    playsinline: false,
    width: 400,
    height: 300
  };
  player = new Vimeo.Player(document.querySelector("#video"), options);
}

function pause() {
  if (player) {
    player.pauseVideo()
  } else {
    alert("Play a video first");
  }
}

function play() {
  if (player) {
    player.playVideo()
  } else {
    alert("Play a video first");
  }
}

function defaultiFrame(arg) {
  let web = `<iframe src="${arg}" frameborder="0" sandbox="allow-scripts allow-popups allow-forms allow-same-origin" allowfullscreen="" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; border-radius: 1px; pointer-events: auto; background-color: rgb(247, 246, 245);"></iframe>`
  document.querySelector('#video').innerHTML = web

}

window.addEventListener('keyup', function(e){
  if(e.key == 'Escape')
    ipcRenderer.send('exit-full-screen')
})

ipcRenderer.on('pause', (ev, arg) => {
  pause()
})

ipcRenderer.on('play', (ev, arg) => {
  play()
})

ipcRenderer.on('youtube', (ev, arg) => {
  console.log('called')
  putYoutube(arg)
})

ipcRenderer.on('vimeo', (ev, arg) => {
  putVimeo(arg)
})

ipcRenderer.on('googleDocs', (ev, arg) => {
  defaultiFrame(arg)
})

ipcRenderer.on('invalidUrl', () => {
  notif('Oops! This isn\'t supported URL')
})

ipcRenderer.on("alertUser", (event, message, url) => {
  var userInput = confirm(message);
  if (userInput == true) {
    alert(
      `Step 1. Copy the URL\nStep 2. Open in your favorite browser.\n\n${url}`
    );
  }
});
