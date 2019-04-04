import Generator from "./generator";

export const functionCallGen: Generator = ($) => {
    /**
     * Generator legend:
     * 
     * [0] Token.Id : Target function name
     * [1] Token.SymbolParenOpen : void
     * [2..n] {Token.Id, Token.Id} : Arguments
     * [n+1] Token.SymbolParenClose : void
     */

    
};
