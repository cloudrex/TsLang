import {IToken} from "../syntaxAnalysis/token";

/**
 * Transforms and alters token sequences.
 */
export type Transform<T extends string[] = string[]> = (sequence: T) => IToken[];
