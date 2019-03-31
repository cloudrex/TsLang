import {GeneratorTarget, GeneratorBuilder} from "./generator";
import {LLVMContext} from "llvm-node";

import CodeMap from "../syntaxAnalysis/codeMap";

export interface IGeneratorContextOpts<T extends GeneratorTarget = GeneratorTarget> {
    readonly target: T;
    readonly context: LLVMContext;
    readonly builder: GeneratorBuilder;
    readonly map: CodeMap;
}

export default class GeneratorContext<T extends GeneratorTarget = GeneratorTarget> {
    public readonly map: CodeMap;
    public readonly context: LLVMContext;
    public readonly builder: GeneratorBuilder;

    public target: T;

    public constructor(target: T, context: LLVMContext) {
        this.target = target;
        this.context = context;
        this.builder = new GeneratorBuilder(this);
        this.map = new CodeMap();
    }

    /**
     * Returns a copy of this context
     * with the specified target instead of
     * the current target.
     */
    public withTarget<T extends GeneratorTarget = GeneratorTarget>(target: T): GeneratorContext<T> {
        return new GeneratorContext<T>(target, this.context);
    }

    // TODO: Create LLVM entities from here? Use CodeMap for manipulation of LOCAL entities?
}
