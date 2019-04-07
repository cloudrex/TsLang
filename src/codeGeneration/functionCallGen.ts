import Generator from "./generator";

export const functionCallGen: Generator = ($, stream) => {
    /**
     * Generator legend:
     * 
     * [0] Token.Id : Target function name
     * [1] Token.SymbolParenOpen : void
     * [2..n] {Token.Id, Token.Id} : Arguments
     * [n+1] Token.SymbolParenClose : void
     * [n+2] Token.SymbolSemiColon : void
     */
    
    const name: string = stream.get().value;

    // Ensure function is registered.
    if ($.map.functions.has(name)) {
        // Ensure IR builder's block has a parent.
        if (!$.parentFn) {
            throw new Error("Expected IR builder's insertion block to have a parent");
        }

        // TODO: Arguments.
        $.builder.createCall($.map.functions.get(name)!, []);
    }
    else {
        throw new Error("No function with such name exists");
    }

    // TODO: Skipping is giving errors. Needs testing/debugging.
    // Skip [1].
    stream.skip();

    // TODO: Arguments.

    // Skip [n+1].
    stream.skip();

    // Skip [n+2].
    stream.skip();
};
