import {LLVMContext} from "llvm-node";

export default abstract class Entity<T> {
    protected readonly context: LLVMContext;
    protected readonly model: T;

    protected constructor(model: T, context: LLVMContext) {
        this.model = model;
        this.context = context;
    }

    /**
     * Retrieve the underlying LLVM model.
     */
    public get(): T {
        return this.model;
    }
}
