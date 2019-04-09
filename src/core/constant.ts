import {TokenType} from "../syntaxAnalysis/tokenType";
import {Type, LLVMContext, ConstantInt, ConstantFP} from "llvm-node";
import {ConstantFactoryCallback, ConstantFactory, declarationGen} from "../codeGeneration/declarationGen";
import Construct from "../syntaxAnalysis/construct";
import TokenConstruct from "../syntaxAnalysis/tokenConstruct";
import functionGen from "../codeGeneration/functionGen";
import Generator from "../codeGeneration/generator";
import {blockGen} from "../codeGeneration/blockGen";
import externGen from "../codeGeneration/externGen";
import {argsGen} from "../codeGeneration/argsGen";

export type LlvmTypeResolver = (context: LLVMContext) => Type;

export const types: Map<string, LlvmTypeResolver> = new Map([
    [TokenType.TypeInt, Type.getInt32Ty],
    [TokenType.TypeDouble, Type.getDoubleTy],
    [TokenType.TypeFloat, Type.getFloatTy],
    [TokenType.TypeString, Type.getInt32PtrTy],
    [TokenType.KeywordVoid, Type.getVoidTy],
    [TokenType.TypeBool, Type.getInt1Ty]
]);

export const constantFactories: Map<string, ConstantFactoryCallback> = new Map([
    [TokenType.TypeInt, ConstantInt.get],
    [TokenType.TypeDouble, ConstantFP.get],
    [TokenType.TypeFloat, ConstantFP.get],

    // TODO: Should it be placed here?
    [TokenType.TypeBool, (context: LLVMContext, value): ConstantFactory => {
        if (value === 0) {
            return ConstantInt.getFalse(context);
        }

        return ConstantInt.getTrue(context);
    }]
]);

/**
 * An array with all the available constructs.
 */
export const allConstructs: TokenConstruct[] = [
    Construct.declaration,

    // TODO: Should not be empty.
    // Construct.expr,

    Construct.external,
    Construct.fn,
    Construct.args
].map((construct: TokenType[]) => new TokenConstruct(construct));

export const constructGenerators: Map<readonly TokenType[], Generator> = new Map([
    [Construct.fn, functionGen],
    [Construct.declaration, declarationGen],
    [Construct.block, blockGen],
    [Construct.external, externGen],
    [Construct.args, argsGen]
]);