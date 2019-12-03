const baseMediaProvider = require('./baseMediaProvider')

class vimeoProvider extends baseMediaProvider {
  constructor () {
    super()
    this.name = 'vimeo'
    this.response.type = 'iframe'
    this.response.eventName = 'vimeo'
  }
  matcher (link) {
    if (link !== undefined || link !== '') {
      var regExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/
      var match = link.match(regExp)
      if (match && match[3].length >= 8) {
        return match[3]
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
module.exports = vimeoProvider
