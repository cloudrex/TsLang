import {IToken} from "../syntaxAnalysis/token";
import TokenStream from "../syntaxAnalysis/tokenStream";

/**
 * Transforms and alters token sequences.
 */
export type Transform = (stream: TokenStream) => TokenStream;
