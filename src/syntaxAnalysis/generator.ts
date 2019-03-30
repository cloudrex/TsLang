import {Module, IRBuilder, LLVMContext, BasicBlock} from "llvm-node";
import {TokenType} from "./tokenType";
import {BlockSequence} from "./sequence";
import {Mutable} from "../core/helpers";
import CodeMap from "./codeMap";

export type GeneratorTarget = Module | Function | IRBuilder;

// TODO: This should be a "creator + CodeMap" bridge. It will create desired abstracted LLVM entities (local Blocks, Functions, etc.) and register them on the CodeMap automatically.
export class GeneratorBuilder {
    protected context: Mutable<IGeneratorContext>;

    public constructor(context: IGeneratorContext) {
        this.context = context;
    }

    /**
     * Set the target of the generator context.
     */
    public setTarget(target: GeneratorTarget): this {
        this.context.target = target;

        return this;
    }
}

export interface IGeneratorContext<T extends GeneratorTarget = GeneratorTarget> {
    readonly target: T;
    readonly context: LLVMContext;
    readonly builder: GeneratorBuilder;
    readonly map: CodeMap;
}

/**
 * Processes token sequences & performs corresponding actions.
 * Does not apply sequence transformations.
 */
export type Generator<TSequence extends TokenType[]= TokenType[], TContext extends GeneratorTarget = GeneratorTarget> =
    (context: IGeneratorContext<TContext>, sequence?: Readonly<TSequence>) => void;

export const llvmBlockGen: Generator<BlockSequence, Function> = ($) => {
    /**
     * Transform legend:
     * 
     * 0. Token.SymbolBraceOpen => Create block
     * 1. Token.SymbolBraceClose => void
     */
    const block: BasicBlock = BasicBlock.create($.context);
    const irBuilder: IRBuilder = new IRBuilder($.context);

    irBuilder.setInsertionPoint(block);
    $.builder.setTarget(irBuilder);
};
