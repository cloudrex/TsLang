import {TokenType} from "../syntaxAnalysis/tokenType";
import {Type, LLVMContext} from "llvm-node";

export type LlvmTypeResolver = (context: LLVMContext) => Type;

export const types: Map<string, LlvmTypeResolver> = new Map([
    [TokenType.TypeInt, Type.getInt32Ty],
    [TokenType.TypeDouble, Type.getDoubleTy],
    [TokenType.TypeFloat, Type.getFloatTy],
    [TokenType.TypeString, Type.getInt32PtrTy],
    [TokenType.KeywordVoid, Type.getVoidTy]
]);
