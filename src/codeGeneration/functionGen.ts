import Generator from "./generator";
import {Module, FunctionType, Type, Function, BasicBlock} from "llvm-node";
import Fn from "../entity/function";

const functionGen: Generator<Module> = ($, seq) => {
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

    // TODO: Type, args.
    // Create and emit the function.
    new Fn($.target, $.context, {
        name: seq![1]
    });
};

export default functionGen;
