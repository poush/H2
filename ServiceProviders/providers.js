/*
* @Author: Piyush Agrawal
* @Date:   2018-09-03 02:35:32
* @Last Modified by:   Piyush Agrawal
* @Last Modified time: 2018-09-06 03:46:47
*/

import {youtubeProvider} from './MediaProviders/youtube'
import {pdfProvider} from './MediaProviders/pdf'
import applyMedia from './mediaProviderApplier'
import {clipboard} from 'electron'


let matchers = {

	'youtube' : new youtubeProvider(),
	'pdf': new pdfProvider()
}

module.exports = {

	run(win) {

		let text = clipboard.readText('selection')
		let provider = null
		for(let key in matchers){
			if(matchers[key].matcher(text) !== false){
				provider = key
				break;
			}
		}

		if(provider == null){
			win.webContents.send('invalidUrl', 'ping')
			return
		}

		applyMedia(matchers[provider].getContent, win)
	}
}