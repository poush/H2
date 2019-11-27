const actions = require('../config/actions')
const { globalShortcut } = require('electron')

/**
 * A global action manager, which is responsible for listening
 * actions that can be managed by H2
 */
class ActionManager {
  constructor (mainWin) {
    this.actions = actions
    this.mainWin = mainWin
    this.globals = []
  }

  applyActions () {
    this.actions['keys'].forEach((key) => {
      this.globals.push(
        globalShortcut.register(key.key, key.action(this.mainWin))
      )
    })
  }
}

module.exports = ActionManager
