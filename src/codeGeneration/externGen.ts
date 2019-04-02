import Generator from "./generator";
import {Function, FunctionType, LinkageTypes, Type} from "llvm-node";

// TODO: Use Fn entity for function creation.
const externGen: Generator = ($, seq) => {
    /**
     * Generator legend:
     * 
     * [0] TokenType.KeywordFn : void
     * [1] TokenType.Id : External function name
     * ...
     */

    // Create the function type.
    const type: FunctionType = FunctionType.get(Type.getVoidTy($.pointer.context), false);

    // Create the external function definition.
    Function.create(
        type,
        LinkageTypes.ExternalLinkage,
        seq![1],
        $.pointer.mod
    );

    // TODO: Register the external function in the CodeMap.
};

export default externGen;
