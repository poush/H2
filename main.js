const {
  app,
  Menu,
  Tray,
  BrowserWindow,
  globalShortcut,
  session,
  ipcMain
} = require("electron");
const providers = require("./ServiceProviders/providers");
const fullscreenToggle = require("./lib/fullscreen-toggle");
const utils = require("./lib/util");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray;

function createWindow() {
  // create config
  let config = {
    width: 400,
    height: 300,
    frame: false,
    webPreferences: {
      plugins: true
    },
    titleBarStyle: "customButtonsOnHover"
  };

  // Create the browser window.
  mainWindow = new BrowserWindow(config);
  mainWindow.setMenu(null);


  // Set always on top

  if (process.platform == "darwin") app.dock.hide();

  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");
  // mainWindow.loadURL('https://www.netflix.com')

  // Open the DevTools.
  if (process.env.DEV) mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.

    mainWindow = null;
  });

  // Disable new browser windows and popups
  mainWindow.webContents.on("new-window", function(e, url) {
    e.preventDefault();
    providers.run(mainWindow, url);
    mainWindow.focus();
  });

  globalShortcut.register("CommandOrControl+Shift+V", () => {
    providers.run(mainWindow);
  });
  globalShortcut.register("CommandOrControl+Shift+T", () => {
    // toggles translucent mode
    var translucency = 1;
    if (mainWindow.getOpacity() == 1) {
      translucency = 0.7;
    }
    mainWindow.setOpacity(translucency);
    mainWindow.setIgnoreMouseEvents(translucency < 1);
  });

  globalShortcut.register("Alt+Shift+T", () => {
    // brings the window to top always
    utils.resetWindowToFloat(mainWindow);
  });

  globalShortcut.register("CommandOrControl+Shift+1", () => {
    mainWindow.webContents.send("pause", "ping");
  });
  globalShortcut.register("CommandOrControl+Shift+2", () => {
    mainWindow.webContents.send("play", "ping");
  });
  globalShortcut.register("Alt+Shift+F", () => {
    fullscreenToggle(mainWindow, false);
  });

  // Useful in a scenario where the window becomes irresponsive
  // and the native "quit" shortcut doesn't work
  globalShortcut.register("CommandOrControl+H+Q", () => {
    app.quit();
  });
}

let createMenuTray = () => {
  tray = new Tray(__dirname + "/tray.png");

  const trayMenus = [
    { role: "about" },
    {
      label: "Exit Fullscreen",
      click() {
        fullscreenToggle(mainWindow, true);
      }
    },
    {
      label: "Quit",
      click() {
        app.quit();
      }
    },
    {
      label: "Bring H2 to the front",
      click() {
        utils.resetWindowToFloat(mainWindow);
      }
    }
  ];

  const contextMenu = Menu.buildFromTemplate(trayMenus);

  tray.setToolTip("H2");
  tray.setContextMenu(contextMenu);
  tray.setTitle("H2");
  tray.on("click", function(event) {
    console.log("called");
    !mainWindow.isFocused() ? mainWindow.focus() : true;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on("ready", () => {
  session.defaultSession.clearStorageData();
  createWindow();
  utils.resetWindowToFloat(mainWindow);
  createMenuTray();
});

app.on("will-quit", () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  app.quit();
  // }
});
// Unregister all shortcuts.
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("exit-full-screen", () => {
  fullscreenToggle(mainWindow, true);
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
