const { app, Menu, Tray, BrowserWindow, globalShortcut, session, ipcMain } = require('electron')
const providers = require('./ServiceProviders/providers')
const fullscreenToggle = require('./lib/fullscreen-toggle')
const utils = require('./lib/util');
const createWindow = require('./src/createWindow')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let tray

let createMenuTray = () => {
  tray = new Tray(__dirname + '/tray.png')

  const trayMenus = [
    { role: 'about' },
    { label: 'Exit Fullscreen',
      click() { 
        fullscreenToggle(mainWindow, true) 
      }
    },
    { label: 'Quit', click() { app.quit() } },
    { label: 'Bring H2 to the front',
      click() {
        utils.resetWindowToFloat(mainWindow);
      }
    }
  ];
  
  const contextMenu = Menu.buildFromTemplate(trayMenus);

  tray.setToolTip('H2')
  tray.setContextMenu(contextMenu)
  tray.setTitle('H2');
  tray.on('click', function (event) {
    console.log('called')
    !mainWindow.isFocused() ? mainWindow.focus() : true;
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  session.defaultSession.clearStorageData()
  
  mainWindow = createWindow()
  createMenuTray()
})

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  app.quit()
  // }
})
// Unregister all shortcuts.
app.on('will-quit', () => {
  globalShortcut.unregisterAll()

})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('exit-full-screen', () => {
  fullscreenToggle(mainWindow, true)
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.