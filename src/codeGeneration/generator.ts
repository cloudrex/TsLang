import GeneratorContext from "./generatorContext";
import TokenStream from "../syntaxAnalysis/tokenStream";

// TODO: This should be a "creator + CodeMap" bridge. It will create desired abstracted LLVM entities (local Blocks, Functions, etc.) and register them on the CodeMap automatically.
export class GeneratorBuilder {
    protected context: GeneratorContext;

    public constructor(context: GeneratorContext) {
        this.context = context;
    }

    // TODO
}

/**
 * Processes token sequences & performs corresponding actions.
 * Does not apply sequence transformations.
 */
export type Generator = (context: GeneratorContext, stream: TokenStream) => void;

export default Generator;
