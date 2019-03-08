import TokenStream from "../SyntaxAnalysis/TokenStream";
import ArgsParser, {IFormalArg} from "./Args";

export interface IFunctionHeader {
    readonly name: string;
    readonly args: IFormalArg[];
}

export default abstract class FunctionParser {
    // TODO: Common validation required (.length !== 0, etc.).
    public static parseHeader(stream: TokenStream): IFunctionHeader {
        // Skip 'fn' keyword.
        stream.continue();

        // Capture the function name.
        const name: string = stream.get().value;

        return {
            name,

            // Invoke the formal arguemnt parser.
            args: ArgsParser.parseFormal(stream)
        };
    }
}
