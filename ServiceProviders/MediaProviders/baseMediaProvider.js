const {clipboard} = require('electron')

class baseMediaProvider {

	constructor() {
		this.version = '0.1'
		this.name = 'base'
		this.response = {
			eventName: 'default',
			type: 'link',
			content: ''
		}
	}

	get getContent() {
		let link = clipboard.readText('selection')
		if(this.extractContents(link)){
			// console.log(this.response)
			return this
		}

		throw "InvalidContentByContentExtraction"
	}

	matcher(link) {

	}

	//method
	extractContents(link=null) {
		// to be implemented by inheriting objects
		return true
	}

	postWinLoad(win){
		return true
	}

	preWinLoad(win) {
		//must return true
		return true
	}

}

module.exports = baseMediaProvider