import {IToken} from "../syntaxAnalysis/token";
import {TokenType} from "../syntaxAnalysis/tokenType";

/**
 * Transforms and alters token sequences.
 */
export type Transform<T extends TokenType[]= TokenType[]> = (sequence: T) => IToken[];
