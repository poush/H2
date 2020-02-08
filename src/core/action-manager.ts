import { globalShortcut, BrowserWindow } from 'electron';
import { Action } from './action';
import * as extensions from "../config/extensions.json";

/**
 * A global action manager, which is responsible for listening
 * actions that can be managed by H2
 */
class ActionManager {
  private static instance: ActionManager;

  private actions: Action[];
  private globals: Array<any>;

  private constructor() {
    this.globals = [];
    this.actions = []
  }

  public static get_instance() {
    if (!ActionManager.instance) {
      ActionManager.instance = new ActionManager()
    }
    return ActionManager.instance;
  }

  registerActions(extensions: IExtensions) {
    
  }
}

const manager = ActionManager.get_instance();
manager.registerActions(extensions);
export default manager;