import { ContextResource } from "../core/context-resource";
import { ActionTypes } from "../core/interfaces/action-types";

export abstract class Action {

    public type: ActionTypes;

    // subkey: cmd + h + 6
    public subkey: string = "6";
    /**
     * resolver
     */
    public abstract resolver(context: ContextResource | undefined): void;

    public abstract subKeyHandler(context: ContextResource): void;
}
