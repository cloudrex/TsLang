import {TokenType} from "./tokenType";

/**
 * Simplified representation of a construct.
 */
export type BareConstruct = TokenType[];

/**
 * Contains all possible bare language constructs.
 */
export default class Construct {
    /**
     * The token type construct representation
     * of an expression.
     */
    public static readonly expr: BareConstruct = [
        // TODO
    ];

    /**
     * The token type construct representation
     * of a statement block.
     */
    public static readonly block: BareConstruct = [
        TokenType.SymbolBraceOpen,
        // TODO
        TokenType.SymbolBraceClose
    ];

    /**
     * The token type construct representation
     * of an argument list.
     */
    public static readonly args: BareConstruct = [
        TokenType.SymbolParenOpen,
        // TODO
        TokenType.SymbolParenClose
    ];

    /**
     * The token type construct representation
     * of a function.
     */
    public static readonly fn: BareConstruct = [
        TokenType.KeywordFn,
        TokenType.Id,
        ...Construct.args,
        ...Construct.block
    ];

    public static readonly declaration: BareConstruct = [
        // TODO: Should be multi-type.
        TokenType.TypeInt,
        TokenType.Id,
        TokenType.OpAssign,
        TokenType.NumLiteral
    ];

    public static readonly external: BareConstruct = [
        TokenType.KeywordExtern,
        TokenType.Id,
        ...Construct.args
    ];
}
