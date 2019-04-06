import {Function} from "llvm-node";

/**
 * Manages registered symbols and its corresponding
 * values.
 */
export default class CodeMap {
    public readonly functions: Map<string, Function> = new Map();
}
