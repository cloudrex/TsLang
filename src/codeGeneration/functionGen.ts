import Generator from "./generator";
import {Module, FunctionType, Type, Function, BasicBlock} from "llvm-node";

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
    // Create the function.
    const fn: Function = $.target.getOrInsertFunction(seq![1], FunctionType.get(Type.getVoidTy($.context), false)) as Function;

    // TODO: Register function in CodeMap, along with its body block.
    // Create the body block.
    fn.addBasicBlock(BasicBlock.create($.context));
};

export default functionGen;
