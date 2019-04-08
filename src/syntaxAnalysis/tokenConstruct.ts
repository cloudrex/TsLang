import {IToken} from "./token";
import {TokenType, reverseToken} from "./tokenType";

export default class TokenConstruct {
    /**
     * Validate a token array to ensure it follows the provided sequence.
     */
    public static validate(tokens: IToken[], construct: TokenType[], partial: boolean = false): boolean {
        // Not partial and lengths differ--validation failed.
        if (!partial && tokens.length !== construct.length) {
            return false;
        }

        for (let i: number = 0; i < construct.length; i++) {
            // Type is not reflected in the sequence--validation failed.
            if (tokens[i].type !== reverseToken(construct[i])) {
                return false;
            }
        }

        // Otherwise, the validation passed.
        return true;
    }

    protected construct: TokenType[];

    public constructor(sequence: TokenType[] = []) {
        this.construct = sequence;
    }

    /**
     * Retrieved the stored sequence in its
     * current state.
     */
    public get(): readonly TokenType[] {
        return this.construct;
    }

    /**
     * Concat a token type array to the existing
     * stored sequence.
     */
    public add(sequence: TokenType[]): this {
        this.construct = this.construct.concat(sequence);

        return this;
    }

    /**
     * Append a single token type to the existing
     * stored sequence.
     */
    public addSingle(type: TokenType): this {
        this.construct.push(type);

        return this;
    }

    /**
     * Run the stored sequence against a token array.
     */
    public test(tokens: IToken[]): boolean {
        return TokenConstruct.validate(tokens, this.construct);
    }

    /**
     * Run the stored sequence against the beginning
     * of a token array.
     */
    public partialTest(tokens: IToken[]): boolean {
        return TokenConstruct.validate(tokens, this.construct, true);
    }
}
