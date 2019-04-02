import {GeneratorTarget, GeneratorBuilder} from "./generator";
import {LLVMContext} from "llvm-node";

import CodeMap from "../syntaxAnalysis/codeMap";
import {IPointer} from "../entity/pointer";

export interface IGeneratorContextOpts<T extends GeneratorTarget = GeneratorTarget> {
    readonly target: T;
    readonly context: LLVMContext;
    readonly builder: GeneratorBuilder;
    readonly map: CodeMap;
}

export default class GeneratorContext<T extends GeneratorTarget = GeneratorTarget> {
    public readonly map: CodeMap;
    public readonly builder: GeneratorBuilder;
    public readonly pointer: IPointer;

    public target: T;

    public constructor(pointer: IPointer, target: T) {
        this.target = target;
        this.builder = new GeneratorBuilder(this);
        this.map = new CodeMap();
        this.pointer = pointer;
    }

    /**
     * Returns a copy of this context
     * with the specified target instead of
     * the current target.
     */
    public withTarget<T extends GeneratorTarget = GeneratorTarget>(target: T): GeneratorContext<T> {
        return new GeneratorContext<T>(this.pointer, target);
    }

    // TODO: Create LLVM entities from here? Use CodeMap for manipulation of LOCAL entities?
}
