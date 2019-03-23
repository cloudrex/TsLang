import {IToken} from "../SyntaxAnalysis/token";

export default class Parser {
    protected readonly tokens: IToken[];

    public constructor(tokens: IToken[]) {
        this.tokens = tokens;
    }
}
