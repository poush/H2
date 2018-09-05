/*
* @Author: Piyush Agrawal
* @Date:   2018-09-03 03:13:59
* @Last Modified by:   Piyush Agrawal
* @Last Modified time: 2018-09-06 03:25:54
*/


export default function (toApply, win){

	if(typeof toApply == 'object'){

		if(toApply.type === 'iframe'){
			win.loadFile('./index.html')
			win.webContents.once('dom-ready', () => {
    			win.webContents.send(toApply.eventName, toApply.content)
			})
		}

		else {
			win.loadURL(toApply.content)
		}

	}
}