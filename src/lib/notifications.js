module.exports = function (message, onclick = null) {
  let notif = new Notification('H2', {
    body: message
  })
  return notif
}
