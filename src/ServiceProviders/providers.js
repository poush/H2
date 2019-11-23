const youtubeProvider = require('./MediaProviders/youtube')
const vimeoProvider = require('./MediaProviders/vimeo')
const dailymotionProvider = require('./MediaProviders/dailymotion')

const pdfProvider = require('./MediaProviders/pdf')
const docsProvider = require('./MediaProviders/docs')
const applyMedia = require('./mediaProviderApplier')
const { clipboard } = require('electron')

let matchers = {
  youtube: new youtubeProvider(),
  pdf: new pdfProvider(),
  docs: new docsProvider(),
  vimeo: new vimeoProvider(),
  dailymotion: new dailymotionProvider()
}

module.exports = {
  run (win) {
    let text = clipboard.readText('selection')

    let provider = null
    for (let key in matchers) {
      if (matchers[key].matcher(text) !== false) {
        provider = key
        break
      }
    }

    if (provider == null) {
      win.webContents.send('invalidUrl', 'ping')
      return
    }

    matchers[provider].text = text

    if (arguments[1]) {
      matchers[provider].text = arguments[1]
    }

    applyMedia(matchers[provider].content, win)
  }
}
