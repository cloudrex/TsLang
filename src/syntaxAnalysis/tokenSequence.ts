import {IToken} from "./token";
import {TokenType, reverseToken} from "./tokenType";

export default class TokenSequence {
    /**
     * Validate a token array to ensure it follows the provided sequence.
     */
    public static validate(tokens: IToken[], sequence: TokenType[]): boolean {
        // Lengths differ--validation failed.
        if (tokens.length !== sequence.length) {
            return false;
        }

        for (let i: number = 0; i < tokens.length; i++) {
            // Type is not reflected in the sequence--validation failed.
            if (tokens[i].type !== reverseToken(sequence[i])) {
                return false;
            }
        }

        // Otherwise, the validation passed.
        return true;
    }

    protected sequence: TokenType[];

    public constructor(sequence: TokenType[] = []) {
        this.sequence = sequence;
    }

    /**
     * Retrieved the stored sequence in its
     * current state.
     */
    public get(): ReadonlyArray<TokenType> {
        return this.sequence;
    }

    /**
     * Concat a token type array to the existing
     * stored sequence.
     */
    public add(sequence: TokenType[]): this {
        this.sequence = this.sequence.concat(sequence);

        return this;
    }

    /**
     * Append a single token type to the existing
     * stored sequence.
     */
    public addSingle(type: TokenType): this {
        this.sequence.push(type);

        return this;
    }

    /**
     * Run the stored sequence against a token array and return
     * an array containing the token's values.
     * Returns null if the provided tokens do not satisfy
     * the stored sequence.
     */
    public exec(tokens: IToken[]): string[] | null {
        // Provided tokens do not satisfy sequence.
        if (!TokenSequence.validate(tokens, this.sequence)) {
            return null;
        }

        return tokens.map((token: IToken): string => token.value);
    }
}
