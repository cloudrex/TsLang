import {IToken} from "./token";

export default class TokenStream {
    protected readonly tokens: IToken[];

    protected pos: number;

    public constructor(tokens: IToken[] = []) {
        this.tokens = tokens;
        this.pos = 0;
    }

    /**
     * Fixes the position counter if applicable.
     */
    protected fixBounds(): void {
        if (this.pos < 0) {
            this.pos = 0;
        }
        else if (this.pos > this.tokens.length - 1) {
            this.pos = this.tokens.length - 1;
        }
    }

    /**
     * Set the absolute position counter.
     */
    public setPos(pos: number): this {
        this.pos = pos;

        // Ensure position didn't exit bounds after setting it.
        this.fixBounds();

        return this;
    }

    /**
     * Retrieve the current position counter.
     */
    public getPos(): number {
        return this.pos;
    }

    /**
     * Retrieve the token at the current position counter.
     */
    public get(): IToken {
        const token: IToken = this.tokens[this.pos];

        if (token === undefined) {
            // TODO: Better error reporting.
            throw new Error("Token at current position is undefined");
        }

        return token;
    }

    /**
     * Retrieve all the tokens.
     */
    public getAll(): ReadonlyArray<IToken> {
        return this.tokens;
    }

    /**
     * Advance the position counter and retrieve the next token.
     */
    public next(): IToken {
        return this.skip().get();
    }

    /**
     * Determine whether a token exists in the next position
     * counter.
     */
    public hasNext(): boolean {
        return this.pos + 1 <= this.tokens.length - 1;
    }

    /**
     * Advance the position counter.
     */
    public skip(amount: number = 1): this {
        this.setPos(this.pos + amount);

        return this;
    }

    /**
     * Replace the current token.
     */
    public set(token: IToken): this {
        this.tokens[this.pos] = token;

        return this;
    }

    /**
     * Update the current token's properties.
     */
    public update(changes: Partial<IToken>): this {
        this.tokens[this.pos] = {
            ...this.get(),
            ...changes
        };

        return this;
    }

    /**
     * Returns a copy of the stream with the
     * same position and tokens.
     */
    public clone(): TokenStream {
        const stream: TokenStream = new TokenStream([...this.tokens]);

        stream.setPos(this.pos);

        return stream;
    }

    /**
     * Retrieve upcoming tokens. Does not
     * advance the position counter.
     */
    public peek(pos: number = 1): IToken | null {
        const computedPos: number = this.pos + pos;

        if (this.tokens.length - 1 >= computedPos) {
            return this.tokens[computedPos];
        }

        return null;
    }

    /**
     * Retrieve the first token.
     */
    public first(): IToken {
        return this.tokens[0];
    }

    /**
     * Retrieve the last token.
     */
    public last(): IToken {
        let index: number = this.tokens.length - 1;

        // Ensure index does not overflow.
        if (index < 0) {
            index = 0;
        }

        return this.tokens[index];
    }

    /**
     * Retrieve a token at a specific index.
     */
    public at(index: number): IToken | undefined {
        return this.tokens[index];
    }

    /**
     * Reset the position counter to 0.
     */
    public reset(): this {
        return this.setPos(0);
    }

    /**
     * Whether the current position points to the last
     * token in the stream.
     */
    public get end(): boolean {
        return this.pos === this.tokens.length - 1;
    }

    /**
     * Retrieve all the tokens between the current position
     * counter until the end of all the tokens.
     */
    public getAllFromPos(): IToken[] {
        return this.tokens.slice(this.pos, this.tokens.length);
    }
}
