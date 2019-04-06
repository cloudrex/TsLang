import {GeneratorBuilder} from "./generator";
import {LLVMContext, IRBuilder, Function} from "llvm-node";

import CodeMap from "../syntaxAnalysis/codeMap";
import {IPointer} from "../entity/pointer";

export interface IGeneratorContextOpts {
    readonly target: IRBuilder;
    readonly context: LLVMContext;
    readonly builder: GeneratorBuilder;
    readonly map: CodeMap;
}

export default class GeneratorContext {
    public readonly map: CodeMap;
    public readonly genBuilder: GeneratorBuilder;
    public readonly pointer: IPointer;

    public builder: IRBuilder;

    public constructor(pointer: IPointer, builder: IRBuilder) {
        this.builder = builder;
        this.genBuilder = new GeneratorBuilder(this);
        this.map = new CodeMap();
        this.pointer = pointer;
    }

    /**
     * Returns a copy of this context
     * with the specified target instead of
     * the current target.
     */
    public withBuilder(builder: IRBuilder): GeneratorContext {
        return new GeneratorContext(this.pointer, builder);
    }

    /**
     * Retrieve the builder's parent function.
     * Returns null if not available.
     */
    public get parentFn(): Function | null {
        const parent: Function | undefined = this.builder.getInsertBlock()!.parent;

        return parent || null;
    }

    // TODO: Create LLVM entities from here? Use CodeMap for manipulation of LOCAL entities?
}
