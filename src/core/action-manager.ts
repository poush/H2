import { globalShortcut, BrowserWindow } from 'electron';
import { Action } from './action';
import * as extensions from "../config/extensions.json";
/**
 * A global action manager, which is responsible for listening
 * actions that can be managed by H2
 */
export default class ActionManager {
  private mainWin: BrowserWindow
  private actions: Action[]
  private globals: Array<any>

  constructor(mainWin: BrowserWindow) {
    this.mainWin = mainWin;
    this.globals = [];
    this.actions = []

    this.registerActions()
  }

  registerActions() {

  }

  applyActions() {
    this.actions['keys'].forEach((key) => {

      this.globals.push(
        globalShortcut.register(key.key, key.action(this.mainWin))
      )

    })
  }
}
