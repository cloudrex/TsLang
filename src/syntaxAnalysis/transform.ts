import {IToken} from "./token";
import {TokenType} from "./tokenType";

/**
 * Transforms and alters token sequences.
 */
export type Transform<T extends TokenType[]= TokenType[]> = (sequence: T) => IToken[];
