/*
* @Author: Piyush Agrawal
* @Date:   2018-09-03 02:35:32
* @Last Modified by:   Piyush Agrawal
* @Last Modified time: 2018-09-03 03:35:55
*/

import youtubeProvider from './MediaProviders/youtube'
import applyMedia from './mediaProviderApplier'

let matchers = {

	'youtube' : youtubeProvider

}

module.exports = {

	run(win) {

		let text = clipboard.readText('selection')
		let provider = null
		for(key in matchers){
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