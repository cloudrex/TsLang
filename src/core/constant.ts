import {TokenType} from "../syntaxAnalysis/tokenType";
import {Type, LLVMContext, ConstantInt, ConstantFP} from "llvm-node";
import {ConstantFactoryCallback, ConstantFactory, declarationGen} from "../codeGeneration/declarationGen";
import functionGen from "../codeGeneration/functionGen";
import Generator from "../codeGeneration/generator";
import {blockGen} from "../codeGeneration/blockGen";
import externGen from "../codeGeneration/externGen";
import {argsGen} from "../codeGeneration/argsGen";
import {LinearConstruct, Construct} from "../syntaxAnalysis/construct";
import ConstructBuilder from "../syntaxAnalysis/constructBuilder";
import {exprGen} from "../codeGeneration/exprGen";

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
 * An array with all the top-level available constructs.
 */
export const topLevelConstructs: ConstructBuilder[] = [
    Construct.formalArgs,
    Construct.declare,
    Construct.fn,
    Construct.expr
];

export const constructGenerators: Map<ConstructBuilder, Generator> = new Map([
    [Construct.fn, functionGen],
    [Construct.declare, declarationGen],
    [Construct.expr, exprGen],
    [Construct.formalArgs, argsGen],
    [Construct.extern, externGen]
]);
