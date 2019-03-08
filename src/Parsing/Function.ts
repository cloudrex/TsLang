import TokenStream from "../SyntaxAnalysis/TokenStream";
import ArgsParser, {IFormalArg} from "./Args";
import {Type, SpecialType} from "../Core/Type";

export interface IFunctionHeader {
    readonly name: string;
    readonly args: IFormalArg[];
    readonly returnType: Type;
}

export default abstract class FunctionParser {
    // TODO: Common validation required (.length !== 0, etc.).
    public static parseHeader(stream: TokenStream): IFunctionHeader {
        // Skip 'fn' keyword.
        stream.continue();

        // Capture the function name.
        const name: string = stream.get().value;

        // Invoke the formal arguemnt parser.
        const args: IFormalArg[] = ArgsParser.parseFormal(stream);

        let returnType: Type = SpecialType.Void;

        // The ':' symbol exists, therefore the return type is specified.
        if (stream.hasNext()) {
            // Capture the return type.
            returnType = stream.continue().next().value as Type;
        }

        return {
            name,
            args,
            returnType
        };
    }
}
