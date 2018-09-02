/*
* @Author: Piyush Agrawal
* @Date:   2018-09-03 03:06:12
* @Last Modified by:   Piyush Agrawal
* @Last Modified time: 2018-09-03 03:13:29
*/
import baseMediaProvider from './baseMediaProvider'

class pdfProvider extends baseMediaProvider {
	
	constructor(){
		this.name = 'pdf'
		this.response.type = 'link'
	}

	extractContents(link) {
		
		if (link != undefined || link != '') {  
			this.response.content = link
	  	}

	}

}