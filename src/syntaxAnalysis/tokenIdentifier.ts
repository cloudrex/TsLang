import {RawToken} from "./token";
import {MatchRule, MatchEngine} from "./matchEngine";
import {Pattern} from "../core/pattern";
import {SpecialCharacter} from "../core/specialCharacter";
import {Token, TokenType} from "./tokenType";

export interface ITokenIdentifier {
    readonly defs: ReadonlyMap<MatchRule, string>;

    identify(text: RawToken): TokenType;
}

/**
 * Identify and classify tokens by values.
 */
export class TokenIdentifier implements ITokenIdentifier {
    public static primeCommonTokens(text: RawToken): Token {
        // Test for common tokens.
        if (Pattern.whitepsace.test(text)) {
            return Token.Whitespace;
        }
        else if (text === SpecialCharacter.EOF) {
            return Token.EOF;
        }

        // Otherwise, identify as unknown.
        return Token.Unknown;
    }

    /**
     * Token definitions.
     */
    public readonly defs: ReadonlyMap<MatchRule, TokenType>;

    public constructor(defs: ReadonlyMap<MatchRule, TokenType>) {
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
