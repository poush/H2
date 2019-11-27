let { ipcRenderer } = require('electron')

function simulateKey (keyCode, type, modifiers) {
  var evtName = (typeof (type) === 'string') ? 'key' + type : 'keydown'
  var modifier = (typeof (modifiers) === 'object') ? modifier : {}

  var event = document.createEvent('HTMLEvents')
  event.initEvent(evtName, true, false)
  event.keyCode = keyCode

  for (var i in modifiers) {
    event[i] = modifiers[i]
  }

  document.dispatchEvent(event)

  console.log(document)
}

var onKeyEvent = function (event) {
  var state = 'pressed'

  if (event.type !== 'keypress') {
    state = event.type.replace('key', '')
  }

  console.log('Key with keyCode ')
  console.log(event)
}

document.addEventListener('keypress', onKeyEvent, false)
document.addEventListener('keydown', onKeyEvent, false)
document.addEventListener('keyup', onKeyEvent, false)

function simulate (element, eventName) {
  var options = extend(defaultOptions, arguments[2] || {})
  var oEvent; var eventType = null

  for (var name in eventMatchers) {
    if (eventMatchers[name].test(eventName)) { eventType = name; break }
  }

  if (!eventType) { throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported') }

  if (document.createEvent) {
    oEvent = document.createEvent(eventType)
    if (eventType == 'HTMLEvents') {
      oEvent.initEvent(eventName, options.bubbles, options.cancelable)
    } else {
      oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
        options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
        options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element)
    }
    element.dispatchEvent(oEvent)
  } else {
    options.clientX = options.pointerX
    options.clientY = options.pointerY
    var evt = document.createEventObject()
    oEvent = extend(evt, options)
    element.fireEvent('on' + eventName, oEvent)
  }
  return element
}

function extend (destination, source) {
  for (var property in source) { destination[property] = source[property] }
  return destination
}

var eventMatchers = {
  'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
  'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
  pointerX: 0,
  pointerY: 0,
  button: 0,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  bubbles: true,
  cancelable: true
}

ipcRenderer.on('send-full-screen', (ev, arg) => {
  setTimeout(() => {
    // simulateKey(84, 'down', null)
    runToast()
  }, 500)
})

function runToast () {
  let styles = document.createElement('style')
  styles.innerHTML = '#toast,#toast #desc{color:#fff;white-space:nowrap}#toast{visibility:hidden;max-width:50px;height:50px;margin:auto;background-color:#333;text-align:center;border-radius:2px;position:fixed;z-index:100000;left:0;right:0;top:30px;font-size:17px}#toast #img{width:50px;height:50px;float:left;padding-top:16px;padding-bottom:16px;box-sizing:border-box;background-color:#111;color:#fff}#toast #desc{padding:16px;overflow:hidden}#toast.show{visibility:visible;-webkit-animation:fadein .5s,expand .5s .5s,stay 3s 1s,shrink .5s 2s,fadeout .5s 2.5s;animation:fadein .5s,expand .5s .5s,stay 3s 1s,shrink .5s 4s,fadeout .5s 4.5s}@-webkit-keyframes fadein{from{bottom:0;opacity:0}to{bottom:30px;opacity:1}}@keyframes fadein{from{bottom:0;opacity:0}to{bottom:30px;opacity:1}}@-webkit-keyframes expand{from{min-width:50px}to{min-width:350px}}@keyframes expand{from{min-width:50px}to{min-width:350px}}@-webkit-keyframes stay{from,to{min-width:350px}}@keyframes stay{from,to{min-width:350px}}@-webkit-keyframes shrink{from{min-width:350px}to{min-width:50px}}@keyframes shrink{from{min-width:350px}to{min-width:50px}}@-webkit-keyframes fadeout{from{bottom:30px;opacity:1}to{bottom:60px;opacity:0}}@keyframes fadeout{from{bottom:30px;opacity:1}to{bottom:60px;opacity:0}}'

  document.head.appendChild(styles)
  let toast = document.createElement('div')
  toast.innerHTML = '<div id="toast"><div id="img">H2</div><div id="desc">Press "F" for full screen</div></div>'
  document.body.appendChild(toast)
  launchToast()
}

function launchToast () {
  var x = document.getElementById('toast')
  x.className = 'show'
  setTimeout(function () { x.className = x.className.replace('show', '') }, 5000)
}
