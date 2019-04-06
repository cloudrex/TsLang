import Generator from "./generator";

export const functionCallGen: Generator = ($, stream) => {
    /**
     * Generator legend:
     * 
     * [0] Token.Id : Target function name
     * [1] Token.SymbolParenOpen : void
     * [2..n] {Token.Id, Token.Id} : Arguments
     * [n+1] Token.SymbolParenClose : void
     */
    
    const name: string = stream.get().value;

    console.log("FN Name:", name);

    // Ensure function is registered.
    if (!$.map.functions.has(name)) {
        // TODO: Arguments.
        console.log($.map.functions.get(name)!);
        $.builder.createCall($.builder.getInsertBlock()!.parent!, []);
    }
    else {
        throw new Error("No function with such name exists");
    }
};
