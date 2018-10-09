import {youtubeProvider} from './MediaProviders/youtube'
import {pdfProvider} from './MediaProviders/pdf'
import {docsProvider} from './MediaProviders/docs'
import applyMedia from './mediaProviderApplier'
import {clipboard} from 'electron'


let matchers = {

	'youtube' : new youtubeProvider(),
	'pdf': new pdfProvider(),
	'docs': new docsProvider()
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