const config = require('./config')
const { app, BrowserWindow, globalShortcut} = require('electron')
const fullscreenToggle = require('../lib/fullscreen-toggle')


module.exports = function() {

  // Create the browser window.
  let mainWindow = new BrowserWindow(config.browser)
  mainWindow.setMenu(null)

  // Set always on top
  if (process.platform == 'darwin')
    app.dock.hide()
  
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);
  mainWindow.setAlwaysOnTop(true, "floating", 1);

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  if (process.env.DEV == 1)
    mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // Disable new browser windows and popups
  mainWindow.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    providers.run(mainWindow, url)
    mainWindow.focus();
  });
  
  globalShortcut.register('CommandOrControl+Shift+V', () => {
    providers.run(mainWindow)
  })
  globalShortcut.register('CommandOrControl+Shift+T', () => {
    // toggles translucent mode
    var translucency = 1;
    if(mainWindow.getOpacity() == 1){
      translucency = 0.7
    }
    mainWindow.setOpacity(translucency);
    mainWindow.setIgnoreMouseEvents(translucency<1);
  })
  
  globalShortcut.register('Alt+Shift+T', () => {
    // brings the window to top always
    utils.resetWindowToFloat(mainWindow);
  })

  globalShortcut.register('CommandOrControl+Shift+1', () => {
    mainWindow.webContents.send('pause', 'ping')
  })
  globalShortcut.register('CommandOrControl+Shift+2', () => {
    mainWindow.webContents.send('play', 'ping')
  })
  globalShortcut.register('Alt+Shift+F', () => {
    fullscreenToggle(mainWindow, false)
  })

  // Useful in a scenario where the window becomes irresponsive
  // and the native "quit" shortcut doesn't work
  globalShortcut.register('CommandOrControl+H+Q', () => {
    app.quit()
  })

  return mainWindow
}