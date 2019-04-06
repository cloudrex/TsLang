import Generator from "./generator";
import {IToken} from "../syntaxAnalysis/token";
import {TokenType} from "../syntaxAnalysis/tokenType";

export const argsGen: Generator = ($, stream) => {
    /**
     * Generator legend:
     * 
     * [0] '('
     * [1..n] Arguments
     * [n+1] ')'
     */

    // Skip '('.
    stream!.skip();

    let peek: IToken | null = stream!.peek();

    // Process arguments.
    while (peek !== null && peek.type !== TokenType.SymbolParenClose) {
        const type: IToken = stream!.next();
        const name: IToken = stream!.next();

        // TODO
        $.builder/*.*/;

        // Continue processing.
        peek = stream!.peek();
    }

    // Skip ')'.
    stream!.skip();
};
