import Generator from "./generator";
import {IToken} from "../syntaxAnalysis/token";
import {TokenType} from "../syntaxAnalysis/tokenType";
import {Function} from "llvm-node";

export const argsGen: Generator<Function> = ($, stream) => {
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
        $.target/*.*/;

        // Continue processing.
        peek = stream!.peek();
    }

    // Skip ')'.
    stream!.skip();
};
