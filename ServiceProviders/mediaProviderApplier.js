/*
* @Author: Piyush Agrawal
* @Date:   2018-09-03 03:13:59
* @Last Modified by:   Piyush Agrawal
* @Last Modified time: 2018-09-06 04:07:40
*/

import baseMediaProvider from './MediaProviders/baseMediaProvider'

export default function (toApply, win){

	if(toApply instanceof baseMediaProvider){

		if(toApply.response.type === 'iframe'){
			win.loadFile('./index.html')
			console.log('test')

			win.webContents.once('dom-ready', () => {
				win.webContents.send(toApply.response.eventName, toApply.response.content)
			})
		}

		else {
			toApply.preWinLoad(win)
			win.loadURL(toApply.response.content)
			toApply.postWinLoad(win)
		}

	}
}