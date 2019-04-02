import Entity from "./entity";
import {BasicBlock, IRBuilder} from "llvm-node";
import {IPointer} from "./pointer";

export default class Block extends Entity<BasicBlock> {
    /**
     * The corresponding IR builder of this
     * block.
     */
    public readonly builder: IRBuilder;

    public constructor(pointer: IPointer) {
        // Create the block and invoke the parent's constructor.
        super(BasicBlock.create(pointer.context), pointer);

        // Create the IR builder.
        this.builder = new IRBuilder(this.model);
    }
}
