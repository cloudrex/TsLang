import Util from "../core/util";

export enum CommonTokenType {
    Unknown = -1,
    EOF = -2,
    Whitespace = -3
}

export enum Token {
    // Keywords
    KeywordFn = "fn",

    KeywordReturn = "ret",

    KeywordExport = "export",

    KeywordImport = "import",

    KeywordVar = "var",

    // Symbols
    SymbolBraceOpen = "{",

    SymbolBraceClose = "}",

    SymbolParenOpen = "(",

    SymbolParenClose = ")",

    SymbolColon =  ":",

    SymbolSemiColon = ";",

    // Literals
    CharLiteral = "/'([^']?)'/",

    StringLiteral = "/\"([^\"]*)\"/",

    // Types
    TypeInt = "int",

    TypeFloat = "float",

    TypeDouble = "double",

    TypeString = "str",

    // Misc
    Whitespace = "/[\\s\\t\\n]/",

    EOF = "/$/",

    Unknown = "/$/",

    Id = "/[_a-zA-Z]+/"
}

export type TokenType = Token | string;

export default abstract class TokenTypeUtil {
    public static parseEnum(input: any): Map<string, string> {
        const result: Map<string, string> = new Map();

        // Extract keys and values.
        const keys: string[] = Util.resolveEnumKeys(input);
        const values: string[] = Util.resolveEnumValues(input);

        // Populate result map.
        keys.forEach((key: string, index: number) => {
            result.set(key, values[index]);
        });

        return result;
    }
}
