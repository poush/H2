import { WebContents } from "electron";

export abstract class OutputService {

    public eventToListen: string;

    constructor(data: {
        webContents: WebContents;
        event: string;
    }) {
        this.eventToListen = event;
        this.webContents = webContents;
    }

    public abstract handle(): void;
}
