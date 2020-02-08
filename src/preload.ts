import { ipcRenderer } from "electron";

ipcRenderer.on("send-full-screen", () => {
    setTimeout(() => {
        runToast();
    }, 500);
});

function runToast() {
    const styles = document.createElement("style");
    styles.innerHTML = "#toast,#toast #desc{color:#fff;white-space:nowrap}#toast{visibility:hidden;max-width:50px;height:50px;margin:auto;background-color:#333;text-align:center;border-radius:2px;position:fixed;z-index:100000;left:0;right:0;top:30px;font-size:17px}#toast #img{width:50px;height:50px;float:left;padding-top:16px;padding-bottom:16px;box-sizing:border-box;background-color:#111;color:#fff}#toast #desc{padding:16px;overflow:hidden}#toast.show{visibility:visible;-webkit-animation:fadein .5s,expand .5s .5s,stay 3s 1s,shrink .5s 2s,fadeout .5s 2.5s;animation:fadein .5s,expand .5s .5s,stay 3s 1s,shrink .5s 4s,fadeout .5s 4.5s}@-webkit-keyframes fadein{from{bottom:0;opacity:0}to{bottom:30px;opacity:1}}@keyframes fadein{from{bottom:0;opacity:0}to{bottom:30px;opacity:1}}@-webkit-keyframes expand{from{min-width:50px}to{min-width:350px}}@keyframes expand{from{min-width:50px}to{min-width:350px}}@-webkit-keyframes stay{from,to{min-width:350px}}@keyframes stay{from,to{min-width:350px}}@-webkit-keyframes shrink{from{min-width:350px}to{min-width:50px}}@keyframes shrink{from{min-width:350px}to{min-width:50px}}@-webkit-keyframes fadeout{from{bottom:30px;opacity:1}to{bottom:60px;opacity:0}}@keyframes fadeout{from{bottom:30px;opacity:1}to{bottom:60px;opacity:0}}";

    document.head.appendChild(styles);
    const toast = document.createElement("div");
    toast.innerHTML = '<div id="toast"><div id="img">H2</div><div id="desc">Press "F" for full screen</div></div>';
    document.body.appendChild(toast);
    launch_toast();
}


function launch_toast() {
    const x = document.getElementById("toast");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
}
