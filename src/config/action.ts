import ContextResource from "src/core/context-resource";
import { ActionTypes } from "src/core/interfaces/action-types";

export abstract class Action {

    public type: ActionTypes;
    /**
     * resolver
     */
    public abstract resolver(context: ContextResource | undefined): void;
}
