function fullscreenToggle (screen, escCmd) {
  if (!screen.isFullScreen() && !escCmd) {
    screen.setFullScreenable(true)
    screen.setFullScreen(true)
  } else {
    screen.setFullScreen(false)
    screen.setFullScreenable(false)
  }
}

module.exports = fullscreenToggle
