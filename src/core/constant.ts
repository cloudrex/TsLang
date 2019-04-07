import {TokenType} from "../syntaxAnalysis/tokenType";
import {Type, LLVMContext, ConstantInt, ConstantFP} from "llvm-node";
import {ConstantFactoryCallback, ConstantFactory} from "../codeGeneration/declarationGen";

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
