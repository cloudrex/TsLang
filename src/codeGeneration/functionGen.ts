import Generator from "./generator";
import Fn from "../entity/function";
import {Function} from "llvm-node";

const functionGen: Generator = ($, stream) => {
    /**
     * Generator legend:
     * 
     * [0] Token.KeywordFn : void
     * [1] Token.Id : Create function
     * [2] Token.SymbolParenOpen : void
     * [3] Token.SymbolParenClose : void
     * [4] Token.SymbolBraceOpen : void
     * [5] Token.SymbolBraceClose : void
     */

    const name: string = stream!.at(1)!.value;

    // TODO: Type, args.
    // Create and emit the function.
    const fn: Function = new Fn($.pointer, {
        name
    }).get();

    // Register the function in the code map.
    $.map.functions.set(name, fn);

    // Consume tokens.
    stream.skip(5);
};

export default functionGen;
