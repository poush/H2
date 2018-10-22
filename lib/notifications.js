export default function(message, onclick = null) {
  console.log(Notification);
  let notif = new Notification("H2", {
    body: message
  });
}
