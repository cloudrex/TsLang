import {IToken} from "./Token";

export default class TokenStream {
    protected readonly tokens: IToken[];

    protected pos: number;

    public constructor(tokens: IToken[]) {
        if (tokens.length === 0) {
            // TODO: Should use ReportError? Maybe with 'Internal' error type?
            throw new Error("Cannot create a token stream with an empty token array");
        }

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
        return this.continue().get();
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
    public continue(amount: number = 1): this {
        this.setPos(this.pos + amount);

        return this;
    }
    
    /**
     * Reset the position counter to 0.
     */
    public reset(): this {
        return this.setPos(0);
    }
}
