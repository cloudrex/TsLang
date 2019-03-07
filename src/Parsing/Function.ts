import {IToken} from "../SyntaxAnalysis/Token";
import Validate from "../SyntaxAnalysis/TokenValidation";

export class FunctionHeader {
    readonly name?: string;

    public constructor(name?: string) {
        this.name = name;
    }

    /**
     * Whether the function header corresponds to an anonymous function.
     */
    public get isAnonymous(): boolean {
        return this.name === undefined;
    }
}

export default abstract class FunctionParser {
    // TODO: Common validation required (.length !== 0, etc.).
    public static parseHeader(tokens: IToken[]): FunctionHeader {
        
    }
}
