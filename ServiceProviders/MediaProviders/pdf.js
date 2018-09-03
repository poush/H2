/*
* @Author: Piyush Agrawal
* @Date:   2018-09-03 03:06:12
* @Last Modified by:   Piyush Agrawal
* @Last Modified time: 2018-09-03 03:54:05
*/
import baseMediaProvider from './baseMediaProvider'

export default class pdfProvider extends baseMediaProvider {
	
	constructor(){
		this.name = 'pdf'
	}

	matcher(link){
		// @TODO
	}

	extractContents(link) {
		
		if (link != undefined || link != '') {  
			this.response.content = link
	  	}

	}

}