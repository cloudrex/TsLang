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
        TokenType.NumAtom,
        TokenType.SymbolSemiColon
    ];

    public static readonly globalVarDeclaration: TokenType[] = [
        // TODO: Should be multi-type.
        TokenType.TypeInt,

        TokenType.SymbolAt,
        TokenType.Id,
        TokenType.OpAssign,
        TokenType.NumAtom,
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
    public static readonly type: ConstructBuilder = new ConstructBuilder()
        .either(
            TokenType.TypeBool,
            TokenType.TypeDouble,
            TokenType.TypeFloat,
            TokenType.TypeInt,
            TokenType.TypeString
        );

    // TODO: Repeating comma problem.
    public static readonly formalArgs: ConstructBuilder = new ConstructBuilder()
        .followedBy(TokenType.SymbolParenOpen)
        .opt(new ConstructBuilder()
            .repeat(new ConstructBuilder()
                .merge(Construct.type)
                .followedBy(TokenType.Id)
            )
        )
        .followedBy(TokenType.SymbolParenClose);

    // TODO: Repeating comma problem.
    public static readonly informalArgs: ConstructBuilder = new ConstructBuilder()
        .followedBy(TokenType.SymbolParenOpen)
        .opt(new ConstructBuilder()
            .repeat(new ConstructBuilder()
                .merge(Construct.type)
                .opt(new ConstructBuilder()
                    .followedBy(TokenType.Id)
                )
            )
        )
        .followedBy(TokenType.SymbolParenClose);

    public static readonly block: ConstructBuilder = new ConstructBuilder()
        .followedBy(TokenType.SymbolBraceOpen)
        // TODO
        .followedBy(TokenType.SymbolBraceClose);

    public static readonly fnReturnType: ConstructBuilder = new ConstructBuilder()
        .opt(new ConstructBuilder()
            .followedBy(TokenType.SymbolColon)
            .either(
                Construct.type,
                TokenType.KeywordVoid
            )
        );

    public static readonly fn: ConstructBuilder = new ConstructBuilder()
        .followedBy(TokenType.KeywordFn)
        .followedBy(TokenType.Id)
        .merge(Construct.formalArgs)
        .merge(Construct.fnReturnType)
        .merge(Construct.block);

    public static readonly atom: ConstructBuilder = new ConstructBuilder()
        .either(
            TokenType.StringAtom,
            TokenType.NumAtom,
            TokenType.CharAtom
        );

    public static readonly basicMathOp: ConstructBuilder = new ConstructBuilder()
        .either(
            TokenType.OpAdd,
            TokenType.OpSub
        );

    public static readonly mathOp: ConstructBuilder = new ConstructBuilder()
        .either(
            Construct.basicMathOp,
            TokenType.OpMultiply,
            TokenType.OpDivide,
            TokenType.OpExponent
        );

    // TODO: Repeating comma problem.
    public static readonly fnCallArgs: ConstructBuilder = new ConstructBuilder()
        .followedBy(TokenType.SymbolParenOpen)
        .repeat(new ConstructBuilder()
            // TODO: Should be expr.
            .followedBy(TokenType.Id)
        )
        .followedBy(TokenType.SymbolParenClose);

    public static readonly fnCall: ConstructBuilder = new ConstructBuilder()
        .followedBy(TokenType.Id)
        .merge(Construct.fnCallArgs);

    public static readonly unaryExpr: ConstructBuilder = new ConstructBuilder()
        .merge(Construct.basicMathOp)
        .merge(Construct.atom);

    public static readonly binExpr: ConstructBuilder = new ConstructBuilder()
        .merge(Construct.atom)
        .merge(Construct.mathOp)
        .merge(Construct.atom);

    public static readonly expr: ConstructBuilder = new ConstructBuilder()
        .either(
            Construct.atom,
            Construct.unaryExpr,
            Construct.binExpr,
            Construct.fnCall
        );

    public static readonly declare: ConstructBuilder = new ConstructBuilder()
        .merge(Construct.type)
        .followedBy(TokenType.Id)
        .followedBy(TokenType.OpAssign)
        .merge(Construct.expr)
        .followedBy(TokenType.SymbolSemiColon);

    public static readonly extern: ConstructBuilder = new ConstructBuilder()
        .followedBy(TokenType.KeywordExtern)
        .followedBy(TokenType.KeywordFn)
        .followedBy(TokenType.Id)
        .merge(Construct.informalArgs)
        .merge(Construct.fnReturnType)
        .followedBy(TokenType.SymbolSemiColon);
}
