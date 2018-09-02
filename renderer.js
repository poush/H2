// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let {clipboard, ipcRenderer} = require('electron')


function pasted(){
	let url = clipboard.readText('selection')
	if(web = generateYoutubeUrl(url)){
	  document.querySelector("#video").innerHTML = web
	  // alert(document.querySelector("#video").innerHTML)
	}
	else
	  alert("Invalid Url, we only support youtube for now");
}


function generateYoutubeUrl(url) {    
  if (url != undefined || url != '') {        
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length == 11) {
          // Do anything for being valid
          // if need to change the url to embed url then use below line            
          let web =  'https://www.youtube.com/embed/' + match[2] + '?autoplay=1&enablejsapi=1'
          return `<iframe style="position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;" src="${web}"></iframe>`
      } else {
        return false;
      }
  }
}


ipcRenderer.on('newlink', (ev, arg) => {
	pasted()
})


ipcRenderer.on('newframe', (ev, arg) => {
	document.querySelector('#video').innerHTML = arg
}) 

