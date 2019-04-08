import {TokenType} from "./tokenType";

/**
 * Contains all possible token constructs.
 */
export default class Construct {
    /**
     * The token type construct representation
     * of an expression.
     */
    public static readonly expr: TokenType[] = [
        // TODO
    ];

    /**
     * The token type construct representation
     * of a statement block.
     */
    public static readonly block: TokenType[] = [
        TokenType.SymbolBraceOpen,
        // TODO
        TokenType.SymbolBraceClose
    ];

    /**
     * The token type construct representation
     * of an argument list.
     */
    public static readonly args: TokenType[] = [
        TokenType.SymbolParenOpen,
        // TODO
        TokenType.SymbolParenClose
    ];

    /**
     * The token type construct representation
     * of a function.
     */
    public static readonly fn: TokenType[] = [
        TokenType.KeywordFn,
        TokenType.Id,
        ...Construct.args,
        ...Construct.block
    ];

    public static readonly declaration: TokenType[] = [
        // TODO: Should be multi-type.
        TokenType.TypeInt,
        TokenType.Id,
        TokenType.OpAssign,
        TokenType.NumLiteral
    ];

    public static readonly external: TokenType[] = [
        TokenType.KeywordExtern,
        TokenType.Id,
        ...Construct.args
    ];
}
