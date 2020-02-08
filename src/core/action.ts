import { ActionTypes } from "./interfaces/action-types";
import ContextResource from "./context-resource"

export abstract class Action {

    public type: ActionTypes;
    /**
     * resolver
     */
    public abstract resolver(context: ContextResource | undefined): void;
}
