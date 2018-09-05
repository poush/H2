/*
* @Author: Piyush Agrawal
* @Date:   2018-09-03 03:06:12
* @Last Modified by:   Piyush Agrawal
* @Last Modified time: 2018-09-06 03:54:51
*/
import baseMediaProvider from './baseMediaProvider'

export class pdfProvider extends baseMediaProvider {
	
	constructor(){
		super()
		this.name = 'pdf'
		this.response.type = 'link'
	}

	matcher(link){
		const regex = /(https?:\/\/\S*?\.pdf)/gm;
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