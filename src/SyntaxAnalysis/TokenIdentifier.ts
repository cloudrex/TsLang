import {TokenType, RawToken, CommonTokenType} from "./Token";
import {MatchRule, MatchEngine} from "./MatchEngine";
import {Pattern} from "../Core/Pattern";
import {SpecialCharacter} from "../Core/SpecialCharacter";

export interface ITokenIdentifier {
    readonly defs: ReadonlyMap<MatchRule, string>;

    identify(text: RawToken): TokenType;
}

/**
 * Identify and classify tokens by values.
 */
export class TokenIdentifier implements ITokenIdentifier {
    public static primeCommonTokens(text: RawToken): CommonTokenType {
        // Test for common tokens.
        if (Pattern.whitepsace.test(text)) {
            return CommonTokenType.Whitespace;
        }
        else if (text === SpecialCharacter.EOF) {
            return CommonTokenType.EOF;
        }

        // Otherwise, identify as unknown.
        return CommonTokenType.Unknown;
    }

    /**
     * Token definitions.
     */
    public readonly defs: ReadonlyMap<MatchRule, string>;

    public constructor(defs: ReadonlyMap<MatchRule, string>) {
        this.defs = defs;
    }

    /**
     * Identify token types by values.
     */
    public identify(text: RawToken): TokenType {
        // Set default case to a common token if applicable.
        let result: TokenType = TokenIdentifier.primeCommonTokens(text);

        // Test all rule definitions.
        for (const [rule, type] of this.defs) {
            if (MatchEngine.test(text, rule)) {
                result = type;

                break;
            }
        }

        return result;
    }
}
