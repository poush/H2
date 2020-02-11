import { IConfig } from "../core/interfaces/config";

export class Config {

    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    private static instance: Config;
    public config: IConfig;

    private constructor() {

    }
}
