const baseMediaProvider = require('./baseMediaProvider')

class dailymotionProvider extends baseMediaProvider {
  constructor () {
    super()
    this.name = 'dailymotion'
    this.response.type = 'iframe'
    this.response.eventName = 'dailymotion'
  }
  matcher (link) {
    if (link !== undefined || link !== '') {
      var regExp = /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/
      var match = link.match(regExp)
      if (match && match[2].length > 5) {
        return match[2]
      }
    }
    return false
  }
  extractContents (link) {
    let match = this.matcher(link)
    this.response.content = match
    return true
  }

}
module.exports = dailymotionProvider
