import baseMediaProvider from "./MediaProviders/baseMediaProvider";

export default function(toApply, win) {
  if (toApply instanceof baseMediaProvider) {
    if (toApply.response.type === "iframe") {
      win.loadFile("./index.html");
      console.log("test");

      win.webContents.once("dom-ready", () => {
        win.webContents.send(
          toApply.response.eventName,
          toApply.response.content
        );
      });
    } else {
      toApply.preWinLoad(win);
      win.loadURL(toApply.response.content);
      toApply.postWinLoad(win);
    }
  }
}
