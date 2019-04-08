import TokenStream from "./tokenStream";
import TokenConstruct from "./tokenConstruct";

export interface ISyntaxAnalyzer {
    //
}

export type AnalyzerCallback = (construct: TokenConstruct) => void;

export class SyntaxAnalyzer implements ISyntaxAnalyzer {
    public readonly constructs: TokenConstruct[];

    protected stream: TokenStream;

    public constructor(stream: TokenStream, constructs: TokenConstruct[] = []) {
        this.stream = stream;
        this.constructs = constructs;
    }

    /**
     * Analyze the current token stream and test
     * for all possible matching constructs.
     */
    public analyze(callback?: AnalyzerCallback): TokenConstruct[] {
        const result: TokenConstruct[] = [];

        for (const construct of this.constructs) {
            if (construct.test(this.stream.getAllFromPos())) {
                result.push(construct);

                // Invoke callback if its defined, and provide it with matching construct.
                if (callback !== undefined) {
                    callback(construct);
                }
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
