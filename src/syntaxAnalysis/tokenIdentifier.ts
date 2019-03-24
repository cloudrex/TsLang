import {RawToken} from "./token";
import {MatchRule, MatchEngine} from "./matchEngine";
import {Pattern} from "../core/pattern";
import {SpecialCharacter} from "../core/specialCharacter";
import {TokenType, CommonTokenType} from "./tokenType";

export interface ITokenIdentifier {
    readonly defs: ReadonlyMap<MatchRule, string>;

    identify(text: RawToken): TokenType;
}

/**
 * Identify and classify tokens by values.
 */
export class TokenIdentifier implements ITokenIdentifier {
    public static primeCommonTokens(text: RawToken): TokenType {
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
