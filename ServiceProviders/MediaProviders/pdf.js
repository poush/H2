const baseMediaProvider = require("./baseMediaProvider");

class pdfProvider extends baseMediaProvider {
  constructor() {
    super();
    this.name = "pdf";
    this.response.type = "link";
  }

  matcher(link) {
    const regex = /(https?:\/\/\S*?\.pdf)/gm;
    var match = regex.exec(link);
    if (match) return match;

    return false;
  }

  extractContents(link) {
    if (link != undefined || link != "") {
      this.response.content = link;
    }

    return true;
  }

  postWinLoad(win) {
    return true;
  }
}

module.exports = pdfProvider;
