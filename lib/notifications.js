const { getDoNotDisturb } from 'electron-notification-state'


module.exports = (message, onclick=null) => {

	if(getDoNotDisturb() || !message)
		return;

	let notif = new Notification('H2', {
    	body: message
  	})

}