import {RawToken} from "./token";
import {MatchEngine, ReadonlyMatchRuleMap, MatchRuleMap} from "./matchEngine";
import {Pattern} from "../core/pattern";
import {SpecialCharacter} from "../core/specialCharacter";
import {TokenType} from "./tokenType";

export interface ITokenIdentifier {
    readonly defs: ReadonlyMatchRuleMap;

    identify(text: RawToken): string;
}

/**
 * Identify and classify tokens by values.
 */
export class TokenIdentifier implements ITokenIdentifier {
    public static primeCommonTokens(text: RawToken): TokenType {
        // Test for common tokens.
        if (Pattern.whitepsace.test(text)) {
            return TokenType.Whitespace;
        }
        else if (text === SpecialCharacter.EOF) {
            return TokenType.EOF;
        }

        // Otherwise, identify as unknown.
        return TokenType.Unknown;
    }

    /**
     * Token definitions.
     */
    public readonly defs: ReadonlyMatchRuleMap;

    public constructor(defs: MatchRuleMap) {
        this.defs = defs;
    }

    /**
     * Identify token types by values.
     */
    public identify(text: RawToken): string {
        // Set default case to a common token if applicable.
        let result: string = TokenIdentifier.primeCommonTokens(text);

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
