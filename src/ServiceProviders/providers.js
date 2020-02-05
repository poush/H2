const youtubeProvider = require('./MediaProviders/youtube')
const vimeoProvider = require('./MediaProviders/vimeo')
const pdfProvider = require('./MediaProviders/pdf')
const docsProvider = require('./MediaProviders/docs')
const applyMedia = require('./mediaProviderApplier')

let matchers = {

  clipboard: {
    youtube: new youtubeProvider(),
    pdf: new pdfProvider(),
    docs: new docsProvider(),
    vimeo: new vimeoProvider()
  }

}

module.exports = {
  run(context) {

    const runners = matchers[context.type];

    let provider = null
    let executed = false;

    for (let runner in runners) {
      if (runners.matcher(context) !== false) {
        runner.text = 
      }
    }
    if (executed === false) {
      context.webContents.send('invalidUrl', 'ping')
      return false;
    }

    matchers[provider].text = text

    if (arguments[1]) {
      matchers[provider].text = arguments[1]
    }

    applyMedia(matchers[provider].content, win)
  }
}
