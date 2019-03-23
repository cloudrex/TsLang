import TokenStream from "../syntaxAnalysis/tokenStream";
import {VarTokenType} from "../syntaxAnalysis/tokenType";

export interface IFormalArg {
    readonly type: VarTokenType;
    readonly name: string;
}

export default abstract class ArgsParser {
    // TODO: Common validation required (.length !== 0, etc.).
    public static parseFormal(stream: TokenStream): IFormalArg[] {
        const result: IFormalArg[] = [];

        // Skip the '(' character.
        stream.continue();

        // TODO: '(' will never be present.
        while (stream.hasNext() && stream.next().type !== '(') {
            // TODO
            result.push();
        }

        return result;
    }
}
