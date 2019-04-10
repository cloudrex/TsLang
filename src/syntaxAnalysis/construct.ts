import {TokenType} from "./tokenType";
import ConstructBuilder from "./constructBuilder";

/**
 * Contains all possible bare linear language constructs.
 */
export class LinearConstruct {
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
        ...LinearConstruct.args,
        ...LinearConstruct.block
    ];

    public static readonly declaration: TokenType[] = [
        // TODO: Should be multi-type.

        TokenType.TypeInt,
        TokenType.Id,
        TokenType.OpAssign,
        TokenType.NumLiteral,
        TokenType.SymbolSemiColon
    ];

    public static readonly globalVarDeclaration: TokenType[] = [
        // TODO: Should be multi-type.
        TokenType.TypeInt,

        TokenType.SymbolAt,
        TokenType.Id,
        TokenType.OpAssign,
        TokenType.NumLiteral,
        TokenType.SymbolSemiColon
    ];

    public static readonly external: TokenType[] = [
        TokenType.KeywordExtern,
        TokenType.Id,
        ...LinearConstruct.args
    ];
}

/**
 * Advanced language constructs.
 */
export abstract class Construct {
    public static readonly args: ConstructBuilder = new ConstructBuilder()
        .followedBy(TokenType.SymbolParenOpen)
        .followedBy(TokenType.SymbolParenClose);

    public static readonly fn: ConstructBuilder = new ConstructBuilder()
        .followedBy(TokenType.KeywordFn)
        .followedBy(TokenType.Id)
        .merge(Construct.args);

    public static readonly type: ConstructBuilder = new ConstructBuilder()
        .either([
            TokenType.TypeBool,
            TokenType.TypeDouble,
            TokenType.TypeFloat,
            TokenType.TypeInt,
            TokenType.TypeString
        ]);

    public static readonly expr: ConstructBuilder = new ConstructBuilder()
        .either([
            TokenType.StringLiteral,
            TokenType.NumLiteral
        ]);

    public static declare: ConstructBuilder = new ConstructBuilder()
        .merge(Construct.type)
        .followedBy(TokenType.Id)
        .followedBy(TokenType.OpAssign)
        .merge(Construct.declare);
}
