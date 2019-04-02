import Block from "./block";
import {LLVMContext, FunctionType, Type, LinkageTypes, Module} from "llvm-node";
import Entity from "./entity";
import {Function} from "llvm-node";
import {IPointer} from "./pointer";

export interface IFnOptions {
    /**
     * The function's return type.
     * Defaults to 'void'.
     */
    readonly type: FunctionType;

    /**
     * The function's linkage type.
     * Defaults to 'ExternalLinkage'.
     */
    readonly linkage: LinkageTypes;

    /**
     * The function's name. Defaults to
     * 'anonymous'.
     */
    readonly name: string;
}

function defaultOptions(context: LLVMContext): IFnOptions {
    return {
        type: FunctionType.get(Type.getVoidTy(context), false),
        linkage: LinkageTypes.ExternalLinkage,
        name: "anonymous"
    };
}

/**
 * A function entity.
 */
export default class Fn extends Entity<Function> {
    public body: Block;

    // TODO: Register function in CodeMap, along with its body block.
    public constructor(pointer: IPointer, options?: Partial<IFnOptions>) {
        const opts: IFnOptions = {
            ...defaultOptions(pointer.context),
            ...options
        };

        // Create the model.
        const model: Function = Function.create(opts.type, opts.linkage, opts.name, pointer.mod);

        // Invoke the parent's constructor.
        super(model, pointer);

        // Initialize the body.
        this.body = new Block(pointer);

        // Link the body block as the function's body.
        this.model.addBasicBlock(this.body.get());
    }

    /**
     * Set the function's name.
     */
    public setName(name: string): this {
        this.model.name = name;

        return this;
    }

    /**
     * Add a block to the function.
     */
    public addBlock(block: Block): this {
        this.model.addBasicBlock(block.get());

        return this;
    }
}
