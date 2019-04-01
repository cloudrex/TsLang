import Generator from "./generator";
import {Module, Function, FunctionType, LinkageTypes, Type} from "llvm-node";

const externGen: Generator<Module> = ($, seq) => {
    /**
     * Generator legend:
     * 
     * [0] TokenType.KeywordFn : void
     * [1] TokenType.Id : External function name
     * ...
     */

    // Create the function type.
    const type: FunctionType = FunctionType.get(Type.getVoidTy($.context), false);

    // Create the external function definition.
    Function.create(
        type,
        LinkageTypes.ExternalLinkage,
        seq![1],
        $.target
    );

    // TODO: Register the external function in the CodeMap.
};

export default externGen;
