import Util from "../core/util";
import {MatchRule} from "./matchEngine";

export enum CommonTokenType {
    Unknown = -1,
    EOF = -2,
    Whitespace = -3
}

export enum Token {
    // Keywords.
    KeywordFn = "fn",

    KeywordReturn = "ret",

    KeywordExport = "export",

    KeywordImport = "import",

    KeywordVar = "var",

    KeywordLet = "let",

    // Symbols.
    SymbolBraceOpen = "{",

    SymbolBraceClose = "}",

    SymbolParenOpen = "(",

    SymbolParenClose = ")",

    SymbolColon =  ":",

    SymbolSemiColon = ";",

    SymbolEqual = "=",

    // Literals.
    CharLiteral = "/'([^']?)'/",

    StringLiteral = "/\"([^\"]*)\"/",

    // Literals.
    // TODO: This without '()' takes precedence somehow. Test-sample: '5 ;'.
    NumLiteral = "/([0-9])/",

    TypeInt = "int",

    TypeFloat = "float",

    TypeDouble = "double",

    TypeString = "str",

    // Misc.
    Whitespace = "/[\\s\\t\\n]/",

    EOF = "/$/",

    Unknown = "/^$/",

    // TODO: This without '()' takes precedence somehow. Test-sample: 'a ='.
    Id = "/([_a-zA-Z]+)/"
}

export type TokenType = Token | string;

export default abstract class TokenTypeUtil {
    /**
     * Parse and reverse an enum to create a
     * token definition map.
     */
    public static parseEnum(input: any): Map<MatchRule, string> {
        const result: Map<string, string> = new Map();

        // Extract keys and values.
        const keys: string[] = Util.resolveEnumKeys(input);
        const values: string[] = Util.resolveEnumValues(input);

        // Populate result map.
        keys.forEach((key: string, index: number) => {
            result.set(key, values[index]);
        });

        return Util.reverseMap(result);
    }
}
