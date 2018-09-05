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


async function pasted() {
	let url = clipboard.readText('selection')
	if(web = generateYoutubeUrl(url)) {
    await apiPromise
    player = new YT.Player(document.querySelector("#video"), {
      height: '100%',
      width: '100%',
      videoId: web,
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
	else
	  alert("Invalid Url, we only support youtube for now");
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
function generateYoutubeUrl(url) {    
  if (url != undefined || url != '') {        
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length == 11) {
          // Do anything for being valid
          // if need to change the url to embed url then use below line            
          // let web =  'https://www.youtube.com/embed/' + match[2] + '?autoplay=1&version=3&enablejsapi=1'
          return match[2]
      } else {
        return false;
      }
  }
}


ipcRenderer.on('newlink', (ev, arg) => {
	pasted()
})

ipcRenderer.on('pause', (ev, arg) => {
	pause()
})

ipcRenderer.on('play', (ev, arg) => {
	play()
})

ipcRenderer.on('newframe', (ev, arg) => {
	document.querySelector('#video').innerHTML = arg
}) 

