const youtubeProvider  = require('./MediaProviders/youtube')
const pdfProvider  	   = require('./MediaProviders/pdf')
const docsProvider     = require('./MediaProviders/docs')
const baseMediaProvider= require('./MediaProviders/baseMediaProvider')
const applyMedia  	   = require('./mediaProviderApplier')
const {clipboard} = require('electron')


let matchers = {

	'youtube' : new youtubeProvider(),
	'pdf': new pdfProvider(),
	'docs': new docsProvider(),
	'provider': new baseMediaProvider()
	
}

module.exports = {

	run(win) {

		if(arguments[1]) {
			clipboard.writeText(arguments[1])
		}

		let text = clipboard.readText('selection');

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