/*
* @Author: Piyush Agrawal
* @Date:   2018-09-03 02:37:16
* @Last Modified by:   Piyush Agrawal
* @Last Modified time: 2018-09-06 03:59:58
*/
import {clipboard} from 'electron'

export default class baseMediaProvider {

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