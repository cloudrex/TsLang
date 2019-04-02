import {Module, LLVMContext} from "llvm-node";

/**
 * Contains contextual LLVM targets.
 */
export interface IPointer {
    /**
     * The LLVM module.
     */
    readonly mod: Module;

    /**
     * The LLVM context.
     */
    readonly context: LLVMContext;
}
