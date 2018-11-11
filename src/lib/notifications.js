module.exports = function (message, sound = true, onclick = null) {
  let notif = new Notification('H2', {
    body: message
  })
  return notif
}
