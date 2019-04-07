import Util, {EnumMap} from "../core/util";
import {MatchRuleMap} from "./matchEngine";

export enum CommonTokenType {
    Unknown = -1,
    EOF = -2,
    Whitespace = -3
}

export enum TokenType {
    // Keywords.
    KeywordFn = "fn",

    KeywordReturn = "ret",

    KeywordExport = "export",

    KeywordImport = "import",

    KeywordVar = "var",

    KeywordLet = "let",

    KeywordExtern = "extern",

    KeywordVoid = "void",

    // Operators.
    OpAssign = "=",

    // Symbols.
    SymbolAt = "@",

    SymbolPipe = "|",

    SymbolBraceOpen = "{",

    SymbolBraceClose = "}",

    SymbolParenOpen = "(",

    SymbolParenClose = ")",

    SymbolColon = ":",

    SymbolSemiColon = ";",

    // Literals.
    CharLiteral = "/'([^']?)'/",

    StringLiteral = "/\"([^\"]*)\"/",

    // Literals.
    // TODO: This without '()' takes precedence somehow. Test-sample: '5 ;'. | EDIT: This might be expected, see GH issue #8.
    NumLiteral = "/([0-9](?:\.[0-9]+)?)/",

    TypeInt = "int",

    TypeFloat = "float",

    TypeDouble = "double",

    TypeString = "str",

    // Misc.
    Whitespace = "/[\\s\\t\\n]/",

    EOF = "/$/",

    Unknown = "/^$/",

    // TODO: This without '()' takes precedence somehow. Test-sample: 'a ='.
    Id = "/([_a-zA-Z]+[_a-zA-Z0-9]*)/"
}

/**
 * Reversed Map of the Token enum.
 */
export const reversedToken: EnumMap<string> = Util.reverseMap(Util.resolveEnum(TokenType));

/**
 * Retrieve the key of a Token enum value.
 */
export function reverseToken(token: TokenType): string {
    return reversedToken.get(token)!;
}

export default abstract class TokenTypeUtil {
    /**
     * Parse and reverse an enum to create a
     * token definition map.
     */
    public static parseEnum(input: any): MatchRuleMap {
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
