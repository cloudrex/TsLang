import TokenStream from "./tokenStream";
import {TokenType} from "./tokenType";
import {IToken} from "./token";

export type ConstructBuilderStep = (stream: TokenStream) => boolean;

export default class ConstructBuilder {
    protected readonly steps: ConstructBuilderStep[] = [];
    protected readonly linearBuffer: TokenType[];

    public constructor() {
        this.steps = [];
        this.linearBuffer = [];
    }

    public followedBy(...tokens: TokenType[]): this {
        if (tokens.length === 0) {
            throw new Error("Expected token array to contain at least one element");
        }

        this.linearBuffer.push(...tokens);

        return this;
    }

    protected flushLinearBuffer(): TokenType[] {
        // Save the buffer.
        const linearBuffer: TokenType[] = [...this.linearBuffer]

        // Reset the buffer.
        this.linearBuffer.length = 0;

        return linearBuffer;
    }
    
    protected applyLinearBuffer(): void {
        // Stop if the buffer is empty.
        if (this.linearBuffer.length === 0) {
            return;
        }

        this.steps.push((stream) => {
            const tokens: TokenType[] = this.flushLinearBuffer();
            const streamTokens: IToken[] = stream.getAllFromPos();

            // Stream tokens' length is smaller. Fail immediatly.
            if (streamTokens.length < tokens.length) {
                return false;
            }

            // Loop through flushed tokens.
            for (let i: number = 0; i < tokens.length; i++) {
                // Token mismatch.
                if (streamTokens[i].type !== tokens[i]) {
                    return false;
                }
            }

            return true;
        });
    }

    /**
     * Merge a construct's steps and mark them
     * as optional (not required).
     */
    public opt(construct: ConstructBuilder): this {
        // TODO: Finish implementing.
        throw new Error("Not yet implemented");

        return this;
    }

    /**
     * Merge a construct's steps.
     */
    public merge(construct: ConstructBuilder): this {
        this.steps.push(...construct.steps);

        return this;
    }

    public either(range: TokenType[]): this {
        // Attempt to apply the linear buffer before continuing.
        this.applyLinearBuffer();

        // Create the step.
        this.steps.push((stream) => {
            return range.includes(stream.peek()!.type as TokenType);
        });

        return this;
    }

    /**
     * Test this construct against a token array.
     */
    public test(tokens: IToken[], partial: boolean = false): boolean {
        // Flush and apply linear buffer.
        this.applyLinearBuffer();

        // Mode is not partial and lengths differ. Fail immediatly.
        if (!partial && this.steps.length !== tokens.length) {
            return false;
        }

        // Create a stream to pass onto steps.
        const stream: TokenStream = new TokenStream(tokens);

        // Loop over provided tokens.
        for (let i: number = 0; i < tokens.length; i++) {
            // Step failed.
            if (!this.steps[i](stream)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Test this construct against a token stream.
     */
    public testStream(stream: TokenStream, partial?: boolean): boolean {
        return this.test(stream.getAllFromPos(), partial);
    }

    /**
     * Whether this construct contains no steps.
     */
    public get empty(): boolean {
        return this.steps.length === 0;
    }
}
