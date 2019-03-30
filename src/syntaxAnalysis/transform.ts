import llvm from "llvm-node";
import {IToken} from "./token";
import {BlockSequence} from "./sequence";
import {TokenType} from "./tokenType";

/**
 * Transforms and alters token sequences.
 */
export type Transform<T extends TokenType[] = TokenType[]> = (sequence: T) => IToken[];

export type LiveTransformEnv = llvm.Module | llvm.LLVMContext | llvm.Function | llvm.IRBuilder;

/**
 * Processes token sequences, does not perform
 * transformations.
 */
export type LiveTransform<TSequence extends TokenType[] = TokenType[], TEnv extends LiveTransformEnv = LiveTransformEnv> = (sequence: TSequence, $: TEnv) => void;

export const llvmBlockLiveTransform: LiveTransform<BlockSequence, llvm.Function> = (sequence, $): void => {
    /**
     * Transform legend:
     * 
     * 0. Token.SymbolBraceOpen => Create block
     * 1. Token.SymbolBraceClose => void
     */
    $.
};
