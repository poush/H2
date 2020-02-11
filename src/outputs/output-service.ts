import { WebContents } from "electron";

export abstract class OutputService {

    public eventToListen: string;
    public webContents: WebContents;

    constructor(data: {
        webContents: WebContents;
        event: string;
    }) {
        this.eventToListen = data.event;
        this.webContents = data.webContents;
    }

    public abstract handle(): void;
}
