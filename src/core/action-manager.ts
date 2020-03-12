import { GlobalShortcut, globalShortcut } from "electron";

import IAction from "./types/interfaces/action.js";
import { IExtension } from "./types/interfaces/extension";

/**
 * A global action manager, which is responsible for listening
 * actions that can be managed by H2
 */
class ActionManager {

  public static get_instance() {
    if (!ActionManager.instance) {
      ActionManager.instance = new ActionManager();
    }
    return ActionManager.instance;
  }

  private static instance: ActionManager;

  private actions: Array<{
    superuser: boolean,
    action: IAction | IExtension,
  }>;

  private globals: GlobalShortcut[];
  private actionsRegistered: boolean = false;

  private constructor() {
    this.globals = [];
    this.actions = [];
  }

  // extension is a form of action with no superuser permissions
  public addActions(extensions: Array<IAction | IExtension>) {
    if (this.actionsRegistered) {
      throw new Error("Cannot add actions once they are registered to the system");
    }
    extensions.forEach((extension) => {
      if ("publicExtension" in extension) {
        this.actions.push({
          action: extension,
          superuser: false,
        });
      } else {
        this.actions.push({
          action: extension,
          superuser: true,
        });
      }
    });
  }

  public start(): ActionManager {
    if (!this.actionsRegistered) {
      this.registerActions();
      this.actionsRegistered = true;
    }
    return this;
  }

  private registerActions() {
    if (this.globals.length) {
      this.cleanGlobals();
    }
    this.actions.forEach((action) => {
      if (!("publicExtension" in action)) {

      }
    });
  }

  private cleanGlobals() {
    globalShortcut.unregisterAll();
    this.globals = [];
  }
}

const manager = ActionManager.get_instance();
export default manager;
