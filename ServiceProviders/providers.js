/*
* @Author: Piyush Agrawal
* @Date:   2018-09-03 02:35:32
* @Last Modified by:   Piyush Agrawal
* @Last Modified time: 2018-09-06 03:00:38
*/

import {youtubeProvider} from './MediaProviders/youtube'
import applyMedia from './mediaProviderApplier'
import {clipboard} from 'electron'

console.log(youtubeProvider)
let matchers = {

	'youtube' : new youtubeProvider()

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
			win.webContents.send('invalidprovider', 'ping')
		}

		applyMedia(matchers[provider].getContent, win)
	}
}