import Entity from "./entity";
import {BasicBlock, LLVMContext} from "llvm-node";

export default class Block extends Entity<BasicBlock> {
    public constructor(context: LLVMContext) {
        // Create the block and invoke the parent's constructor.
        super(BasicBlock.create(context), context);
    }
}
