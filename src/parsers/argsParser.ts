import TokenStream from "../syntaxAnalysis/tokenStream";
import {TokenType} from "../syntaxAnalysis/tokenType";

export interface IFormalArg {
    readonly type: TokenType;
    readonly name: string;
}

export default abstract class ArgsParser {
    // TODO: Common validation required (.length !== 0, etc.).
    public static parseFormal(stream: TokenStream): IFormalArg[] {
        const result: IFormalArg[] = [];

        // Skip the '(' character.
        stream.skip();

        // TODO: '(' will never be present.
        while (stream.hasNext() && stream.next().type !== '(') {
            // TODO
            result.push();
        }

        return result;
    }
}
