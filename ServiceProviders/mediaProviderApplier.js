/*
* @Author: Piyush Agrawal
* @Date:   2018-09-03 03:13:59
* @Last Modified by:   Piyush Agrawal
* @Last Modified time: 2018-09-03 03:35:27
*/


export default applyMedia(toApply, win) => {

	if(typeof toApply == 'object'){

		if(toApply.type === 'iframe'){
			win.loadFile('../index.html')
    		win.webContents.send('newframe', this.response.content)
		}

		else {
			win.loadURL(this.response.content)
		}

	}
}