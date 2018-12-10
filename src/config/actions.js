const { app } = require('electron')

const providers = require('../ServiceProviders/providers')
const fullscreenToggle = require('../lib/fullscreen-toggle')

module.exports = {
  keys: [
    {
      key: 'CommandOrControl+Shift+V',
      action: (mainWin) => {
        return () => {
          providers.run(mainWin)
        }
      }
    },
    {
      key: 'CommandOrControl+H+Q',
      action: (mainWin) => {
        return () => {
          app.quit()
        }
      }
    },

    {
      key: 'CommandOrControl+Shift+1',
      action: (mainWin) => {
        return () => {
          mainWin.webContents.send('pause', 'ping')
        }
      }
    },
    {
      key: 'CommandOrControl+Shift+2',
      action: (mainWin) => {
        return () => {
          mainWin.webContents.send('play', 'ping')
        }
      }
    },
    {
      key: 'Alt+Shift+F',
      action: (mainWin) => {
        return () => {
          fullscreenToggle(mainWin, false)
        }
      }
    },
    {
      key: 'CommandOrControl+Shift+T',
      action: (mainWin) => {
        // toggles translucent mode
        return () => {
          let translucency = 1
          if (mainWin.getOpacity() === 1) {
            translucency = 0.7
          }
          mainWin.setOpacity(translucency)
          mainWin.setIgnoreMouseEvents(translucency < 1)
        }
      }
    }
  ]
}
