import TokenStream from "./tokenStream";
import TokenSequence from "./tokenSequence";

export interface ISyntaxAnalyzer {
    //
}

export class SyntaxAnalyzer implements ISyntaxAnalyzer {
    public readonly sequences: TokenSequence[];

    protected stream: TokenStream;

    public constructor(stream: TokenStream, sequences: TokenSequence[] = []) {
        this.stream = stream;
        this.sequences = sequences;
    }

    /**
     * Analyze the current token stream and test
     * for all possible matching sequences.
     */
    public analyze(): TokenSequence[] {
        const result: TokenSequence[] = [];

        for (const sequence of this.sequences) {
            if (sequence.test(this.stream.getAllFromPos())) {
                result.push(sequence);
            }
        }

        return result;
    }

    /**
     * Change the source token stream.
     */
    public setStream(stream: TokenStream): this {
        this.stream = stream;
        
        return this;
    }
}
