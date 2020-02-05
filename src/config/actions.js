const { app } = require("electron");

const providers = require("../ServiceProviders/providers");
const fullscreenToggle = require("../lib/fullscreen-toggle");
const { clipboard } = require('electron')


module.exports = {
  keys: [
    {
      key: "CommandOrControl+Shift+V",
      action: (mainWin) => {
        // this action is to read clipboard
        const context = {
          type: 'clipboard',
          contentType: 'text',
          content: clipboard.readText('selection'),
          webContents: mainWin.webContents
        }
        return () => {
          providers.run(context);
        }
      }
    },
    {
      key: "CommandOrControl+H+Q",
      action: (mainWin) => {
        return () => {
          app.quit()
        }
      }
    },

    {
      key: "CommandOrControl+Shift+1",
      action: (mainWin) => {
        return () => {
          mainWin.webContents.send("pause", "ping");
        }
      }
    },
    {
      key: "CommandOrControl+Shift+2",
      action: (mainWin) => {
        return () => {
          mainWin.webContents.send("play", "ping");
        }
      }
    },
    {
      key: "Alt+Shift+F",
      action: (mainWin) => {
        return () => {
          fullscreenToggle(mainWin, false);
        }
      }
    },
    {
      key: "CommandOrControl+Shift+T",
      action: (mainWin) => {
        // toggles translucent mode
        return () => {
          let translucency = 1;
          if (mainWin.getOpacity() == 1) {
            translucency = 0.7;
          }
          mainWin.setOpacity(translucency);
          mainWin.setIgnoreMouseEvents(translucency < 1);
        }
      }
    }
  ]
}
