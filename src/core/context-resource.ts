import { WebContents } from "electron";

export default class ContextResource {

    // @TODO it should be enum/class of supported platforms
    public platform: string;

    public webContents: WebContents;

    constructor(data: {
        platform: string | undefined,
        webContents: WebContents,
    }) {
        this.webContents = data.webContents;
    }
}
