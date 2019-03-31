import {Module, IRBuilder, BasicBlock, Type, AllocaInst, ConstantInt} from "llvm-node";
import GeneratorContext from "./generatorContext";

export type GeneratorTarget = Module | Function | IRBuilder;

// TODO: This should be a "creator + CodeMap" bridge. It will create desired abstracted LLVM entities (local Blocks, Functions, etc.) and register them on the CodeMap automatically.
export class GeneratorBuilder {
    protected context: GeneratorContext;

    public constructor(context: GeneratorContext) {
        this.context = context;
    }

    // TODO
}

/**
 * Processes token sequences & performs corresponding actions.
 * Does not apply sequence transformations.
 */
export type Generator<TContext extends GeneratorTarget = GeneratorTarget> =
    (context: GeneratorContext<TContext>, sequence?: ReadonlyArray<string>) => void;

export const blockGen: Generator<Function> = ($) => {
    /**
     * Generator legend:
     * 
     * [0] Token.SymbolBraceOpen : Create block
     * [1] Token.SymbolBraceClose : void
     */

    const block: BasicBlock = BasicBlock.create($.context);
    const irBuilder: IRBuilder = new IRBuilder($.context);

    irBuilder.setInsertionPoint(block);
    
    // TODO: Register the irBuilder of this block in the CodeMap.
};

export const declarationGen: Generator<IRBuilder> = ($, seq) => {
    /**
     * Generator legend:
     * 
     * [0] Token.TypeInt : Allocate INT32
     * [1] Token.Id : Name allocation
     * [2] Token.OpAssign : Prepare assignment
     * [3] Token.NumLiteral : Assign value
     */

    const intType: Type = Type.getInt32Ty($.context);
    const allocaInst: AllocaInst = $.target.createAlloca(intType);

    // Assign name.
    allocaInst.name = seq![1];

    // Create value.
    const value: ConstantInt = ConstantInt.get($.context, parseInt(seq![3]));

    // Assign value.
    $.target.createStore(value, allocaInst);
};

export const returnGen: Generator<IRBuilder> = ($) => {
    /**
     * Generator legend:
     * 
     * -
     */

    // TODO: Temporarily force-return void.
    $.target.createRetVoid();
};

export default Generator;
