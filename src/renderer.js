// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let { clipboard, ipcRenderer } = require("electron");
const notif = require("./lib/notifications");

let player;


let apiPromise = new Promise(resolve => {
  window.onYouTubeIframeAPIReady = () => {
    //     console.log("YouTube API loaded");
    resolve();
  };
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";

  let firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

async function putYoutube(videoId) {
  await apiPromise
  let pl = new YT.Player('video', {
    height: "100%",
    width: "100%",
    videoId: videoId,
    playerVars: {
      autoplay: 1,
      fs: 0,
      modestbranding: 1
    },
    events: {
      onReady: event => {
        console.log(event)
      },
      onStateChange: event => {
        // console.log(event)
      }
    }
  });
  document.body.innerHTML += `<button onclick="location.reload()" style="cursor:pointer;border:none;background:none;z-index:999999;margin:60vh 82% 0 0;opacity:.5;font-weight:800"><svg version="1.1" id="h2-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 27 25"  xml:space="preserve"><g><circle class="white" cx="13.5" cy="22.8" r="2.1"></circle><polygon class="white" points="13.5,0 0,11.2 0,24.6 2.8,24.6 2.8,12.5 13.5,3.7 24.2,12.5 24.2,24.6 27,24.6 27,11.2 	"></polygon></g></svg></button>`;

  window.player = pl
  player = {
    api: pl,
    status: 1
  }
}

function putVimeo(videoId) {
  let pl = new Vimeo.Player(document.querySelector("#video"), {
    id: videoId,
    autoplay: true,
    transparent: false
  });
  player = {
    api: pl,
    status: 1
  }
}
function putDailymotion (videoId) {
  let web = '<iframe frameborder="0" src="https://www.dailymotion.com/embed/video/' + videoId + '" allowfullscreen allow="autoplay"></iframe>'
  document.querySelector('#video').innerHTML = web
}
function togglePlay () {
  if (player) {
    if(player.status == 1) {
        player.pauseVideo()
        player.status = 0
    } else if (player.status == 0) {
        player.playVideo()
        player.status = 1
    }
  } else {
    alert("Play a video first");
  }
}

function defaultiFrame(arg) {
  let web = `<iframe src="${arg}" frameborder="0" sandbox="allow-scripts allow-popups allow-forms allow-same-origin" allowfullscreen="" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; border-radius: 1px; pointer-events: auto; background-color: rgb(247, 246, 245);"></iframe>`;
  document.querySelector("#video").innerHTML = web;
}

window.addEventListener('keyup', function(e){
  if(e.key == 'Escape')
    ipcRenderer.send('exit-full-screen')
})

ipcRenderer.on('togglePlay', (ev, arg) => {
  togglePlay()
})

ipcRenderer.on("youtube", async (ev, arg) => {
  await putYoutube(arg);
  let frame = document.getElementById('video')
  console.log(frame)

  frame.addEventListener("load", function() {
    setTimeout( () => {
      if(document.getElementById('video').contentDocument.querySelector('.ytp-error-content-wrap-reason'))
        ipcRenderer.send('openLink', 'https://youtube.com/watch?v='+arg)
    }, 2000)
  });
});

ipcRenderer.on('vimeo', (ev, arg) => {
  putVimeo(arg)
})
ipcRenderer.on('dailymotion', (ev, arg) => {
  putDailymotion(arg)
})
ipcRenderer.on('googleDocs', (ev, arg) => {
  defaultiFrame(arg)
})

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
