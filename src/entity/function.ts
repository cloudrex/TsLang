import Block from "./block";
import {LLVMContext, FunctionType, Type, LinkageTypes, Module} from "llvm-node";
import Entity from "./entity";
import {Function} from "llvm-node";

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

    public constructor(module: Module, context: LLVMContext, options?: Partial<IFnOptions>) {
        const opts: IFnOptions = {
            ...defaultOptions(context),
            ...options
        };

        // Create the model.
        const model: Function = Function.create(opts.type, opts.linkage, opts.name, module);

        // Invoke the parent's constructor.
        super(model, context);

        // Initialize the body.
        this.body = new Block(context);

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
}
