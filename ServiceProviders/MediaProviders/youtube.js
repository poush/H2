/*
* @Author: Piyush Agrawal
* @Date:   2018-09-03 02:35:50
* @Last Modified by:   Piyush Agrawal
* @Last Modified time: 2018-09-03 03:26:07
*/
import baseMediaProvider from './baseMediaProvider'

class youtubeProvider extends baseMediaProvider {
	
	constructor(){
		this.name = 'youtube'
		this.response.type = 'frame'
	}

	matcher(link){

		if (link != undefined || link != '') {        
			var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
			var match = link.match(regExp);
			if (match && match[2].length == 11) {
				return match[2]
			}
		}

		return false;

	}

	extractContents(link) {
		let match = matcher(link)
	  	let web =  'https://www.youtube.com/embed/' + match + '?autoplay=1&enablejsapi=1'
	  	this.response.content = `<iframe style="position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;" src="${web}"></iframe>`

	  	return this.response

	}

}