module.exports = {

	/*
	* Complete Configuration for the browserWindow
	* the main process
	*/
	browser: {
    	
    	// Dimensions of the initial window
    	width: 400,
    	height: 300,
    	
    	// frames are removed by default
    	frame: false,

    	webPreferences: {
      		plugins: true
    	},

    	// for macOS only
    	titleBarStyle: 'customButtonsOnHover',
	},

	// globalKeyBindings
	// keyBindings: [

	//   [
	//   	'Alt+Shift+T', () => {
	//     	// brings the window to top always
	//     	utils.resetWindowToFloat(mainWindow);
	//     }
	//   ],
	//   [
	//   	'CommandOrControl+Shift+1', () => {
	//     	mainWindow.webContents.send('pause', 'ping')
	//   	}
	//   ],
	//   [
	//   	'CommandOrControl+Shift+2', () => {
	//     	mainWindow.webContents.send('play', 'ping')
	//   	}
	//   ],
	//   [
	//   	'Alt+Shift+F', () => {
	//     	fullscreenToggle(mainWindow, false)
	//   	}
	//   ],
	// ]
}
