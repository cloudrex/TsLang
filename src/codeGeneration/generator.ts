import {Module, IRBuilder, LLVMContext, BasicBlock, Type, AllocaInst} from "llvm-node";
import {Mutable} from "../core/helpers";
import CodeMap from "../syntaxAnalysis/codeMap";

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
export type Generator<TContext extends GeneratorTarget = GeneratorTarget> =
    (context: IGeneratorContext<TContext>, sequence: ReadonlyArray<string>) => void;

export const blockGen: Generator<Function> = ($) => {
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

export const assignmentGen: Generator<IRBuilder> = ($, seq) => {
    /**
     * Transform legend:
     * 
     * 0. Token.TypeInt => Allocate INT32
     * 1. Token.Id => Name allocation
     * 2. Token.OpAssign => Prepare assignment
     * 3. Token.NumLiteral => Assign value
     */
    
    const inst: AllocaInst = $.target.createAlloca(Type.getInt32Ty($.context));

    inst.name = seq[1];
};
