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

        console.log("THIS->CONSTRUCTS", this.constructs);

        for (let i: number = 0; i < this.constructs.length; i++) {
            const construct: TokenConstruct = this.constructs[i];

            // Ensure construct is not empty.
            if (construct.get().length === 0) {
                throw new Error("Expected a non-empty construct");
            }
            // Construct matched.
            else if (construct.partialTest(this.stream.getAllFromPos())) {
                result.push(construct);

                // Invoke callback if its defined, and provide it with matching construct.
                if (callback !== undefined) {
                    callback(construct);
                }

                // Reset the index counter upon every match.
                i = 0;
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
