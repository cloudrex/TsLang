import {TokenType} from "./tokenType";
import ConstructBuilder from "./constructBuilder";

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
        TokenType.NumLiteral,
        TokenType.SymbolSemiColon
    ];

    public static readonly globalVarDeclaration: BareConstruct = [
        // TODO: Should be multi-type.
        TokenType.TypeInt,
        
        TokenType.SymbolAt,
        TokenType.Id,
        TokenType.OpAssign,
        TokenType.NumLiteral,
        TokenType.SymbolSemiColon
    ];

    public static readonly external: BareConstruct = [
        TokenType.KeywordExtern,
        TokenType.Id,
        ...Construct.args
    ];
}

export abstract class NewConstruct {
    public static readonly args: ConstructBuilder = new ConstructBuilder()
        .followedBy(TokenType.SymbolParenOpen)
        .followedBy(TokenType.SymbolParenClose);

    public static readonly fn: ConstructBuilder = new ConstructBuilder()
        .followedBy(TokenType.KeywordFn)
        .followedBy(TokenType.Id)
        .merge(NewConstruct.args);
}
