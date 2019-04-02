import Generator from "./generator";
import {IRBuilder, BasicBlock, Function} from "llvm-node";

export const blockGen: Generator<Function> = ($) => {
    /**
     * Generator legend:
     * 
     * [0] Token.SymbolBraceOpen : Create block
     * [1] Token.SymbolBraceClose : void
     */

    const block: BasicBlock = BasicBlock.create($.pointer.context);
    const irBuilder: IRBuilder = new IRBuilder($.pointer.context);

    irBuilder.setInsertionPoint(block);
    
    // TODO: Register the irBuilder of this block in the CodeMap.
};
