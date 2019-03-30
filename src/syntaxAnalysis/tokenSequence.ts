import {IToken} from "./token";
import {Token} from "./tokenType";

export default class TokenSequence {
    /**
     * Validate a token array to ensure it follows the provided sequence.
     */
    public static validate(tokens: IToken[], sequence: Token[]): boolean {
        // Lengths differ--validation failed.
        if (tokens.length !== sequence.length) {
            return false;
        }

        for (let i: number = 0; i < tokens.length; i++) {
            // Type is not reflected in the sequence--validation failed.
            if (tokens[i].type !== sequence[i]) {
                return false;
            }
        }

        // Otherwise, the validation passed.
        return true;
    }

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
        ...TokenSequence.args,
        ...TokenSequence.block
    ];

    public static readonly assignment: Token[] = [
        Token.KeywordLet,
        Token.Id,
        Token.SymbolEqual,
        Token.NumLiteral
    ];

    protected sequence: Token[];

    public constructor(sequence: Token[] = []) {
        this.sequence = sequence;
    }

    /**
     * Retrieved the stored sequence in its
     * current state.
     */
    public get(): ReadonlyArray<Token> {
        return this.sequence;
    }

    /**
     * Concat a token type array to the existing
     * stored sequence.
     */
    public add(sequence: Token[]): this {
        this.sequence = this.sequence.concat(sequence);

        return this;
    }

    /**
     * Append a single token type to the existing
     * stored sequence.
     */
    public addSingle(type: Token): this {
        this.sequence.push(type);

        return this;
    }

    /**
     * Run the stored sequence against a token array and return
     * an array containing the token's values.
     * Returns null if the provided tokens do not satisfy
     * the stored sequence.
     */
    public test(tokens: IToken[]): string[] | null {
        // Provided tokens do not satisfy sequence.
        if (!TokenSequence.validate(tokens, this.sequence)) {
            return null;
        }

        return tokens.map((token: IToken): string => token.value);
    }
}
