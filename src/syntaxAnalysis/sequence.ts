import {Token} from "./tokenType";

/**
 * Contains all possible token sequences.
 */
export default class Sequence {
    /**
     * The token type sequence representation
     * of an expression.
     */
    public static readonly expr: Token[] = [
        // TODO
    ];

    /**
     * The token type sequence representation
     * of a statement block.
     */
    public static readonly block: Token[] = [
        Token.SymbolBraceOpen,
        // TODO
        Token.SymbolBraceClose
    ];

    /**
     * The token type sequence representation
     * of an argument list.
     */
    public static readonly args: Token[] = [
        Token.SymbolParenOpen,
        // TODO
        Token.SymbolParenClose
    ];

    /**
     * The token type sequence representation
     * of a function.
     */
    public static readonly fn: Token[] = [
        Token.KeywordFn,
        Token.Id,
        ...Sequence.args,
        ...Sequence.block
    ];

    public static readonly assignment: Token[] = [
        // TODO: Should be multi-type.
        Token.TypeInt,
        Token.Id,
        Token.OpAssign,
        Token.NumLiteral
    ];
}
