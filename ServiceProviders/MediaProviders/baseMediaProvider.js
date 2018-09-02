/*
* @Author: Piyush Agrawal
* @Date:   2018-09-03 02:37:16
* @Last Modified by:   Piyush Agrawal
* @Last Modified time: 2018-09-03 03:25:06
*/
export default class baseMediaProvider {

	constructor() {
		this.version = '0.1'
		this.name = 'base'
		this.response = {
			type: 'link',
			content: ''
		}
	}

	get getContent() {
		link = clipboard.readText('selection')

		if(content = this.extractContent(link)){

			if(typeof content == 'object'){
				return content
			}

			throw "InvalidContentByContentExtraction"

		}
	}

	matcher(link) {

	}

	//method
	extractContents(link=null) {
		// to be implemented by inheriting objects
	}

}