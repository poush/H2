import { BrowserWindow } from "electron";

export default interface IAction {
  key: string;
  act: (mainWin: BrowserWindow) => null;
}
