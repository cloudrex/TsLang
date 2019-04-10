import TokenStream from "../syntaxAnalysis/tokenStream";
import ArgsParser, {IFormalArg} from "./argsParser";
import {Type, SpecialType} from "../core/type";
import {blockGen} from "../codeGeneration/blockGen";

export interface IFunctionHeader {
    readonly name: string;
    readonly args: IFormalArg[];
    readonly returnType: Type;
}

export default abstract class FunctionParser {
    // TODO: Common validation required (.length !== 0, etc.).
    public static parseHeader(stream: TokenStream): IFunctionHeader {
        // Skip 'fn' keyword.
        stream.skip();

        // Capture the function name.
        const name: string = stream.get().value;

        // Invoke the formal argument parser.
        const args: IFormalArg[] = ArgsParser.parseFormal(stream);

        let returnType: Type = SpecialType.Void;

        // The ':' symbol exists, therefore the return type is specified.
        if (stream.hasNext()) {
            // Capture the return type.
            returnType = stream.skip().next().value as Type;
        }

        return {
            name,
            args,
            returnType
        };
    }
}
