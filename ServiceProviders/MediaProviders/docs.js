const baseMediaProvider = require('./baseMediaProvider')

class docsProvider extends baseMediaProvider {
	
	constructor(){
		super()
		this.name = 'googleDocs'
		this.response.eventName = 'googleDocs'
		this.response.type = 'iframe'
	}

	matcher(link){
		const regex = /https:\/\/docs.google.com\/document\/d\/[0-9A-Za-z]+/gm;
		var match = regex.exec(link)
		if(match)
			return match;

		return false;
	}

	extractContents(link) {
		if (link != undefined || link != '') {  
			this.response.content = link
	  	}

	  	return true

	}

	postWinLoad(win){
		return true
	}

}

module.exports = docsProvider