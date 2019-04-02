import {IPointer} from "./pointer";

export default abstract class Entity<T> {
    protected readonly pointer: IPointer;
    protected readonly model: T;

    protected constructor(model: T, pointer: IPointer) {
        this.model = model;
        this.pointer = pointer;
    }

    /**
     * Emit the model onto its corresponding
     * LLVM target.
     */
    public emit(): this {
        return this;
    }

    /**
     * Retrieve the underlying LLVM model.
     */
    public get(): T {
        return this.model;
    }
}
