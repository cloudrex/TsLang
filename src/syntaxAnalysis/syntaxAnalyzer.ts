import TokenStream from "./tokenStream";
import ConstructBuilder from "./constructBuilder";

export interface ISyntaxAnalyzer {
    //
}

export type AnalyzerCallback = (construct: ConstructBuilder) => void;

export class SyntaxAnalyzer implements ISyntaxAnalyzer {
    public readonly constructs: ConstructBuilder[];

    protected stream: TokenStream;

    public constructor(stream: TokenStream, constructs: ConstructBuilder[] = []) {
        this.stream = stream;
        this.constructs = constructs;
    }

    /**
     * Analyze the current token stream and test
     * for all possible matching constructs.
     */
    public analyze(callback?: AnalyzerCallback): ConstructBuilder[] {
        const result: ConstructBuilder[] = [];

        for (let i: number = 0; i < this.constructs.length; i++) {
            const construct: ConstructBuilder = this.constructs[i];

            console.log(construct);

            // Ensure construct is not empty.
            if (construct.empty) {
                throw new Error("Expected a non-empty construct");
            }
            // Construct matched.
            else if (construct.testStream(this.stream, true)) {
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
