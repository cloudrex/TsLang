import {RawToken, TokenType, CommonToken} from "./token";
import Pattern from "../core/pattern";
import SpecialCharacter from "../core/special-character";
import MatchEngine, {MatchRule} from "./match-engine";

export interface ITokenIdentifier {
    identify(text: RawToken): TokenType;
}

export default class TokenIdentifier implements ITokenIdentifier {
    public static primeCommonTokens(text: RawToken): CommonToken {
        // Test for common tokens.
        if (Pattern.whitepsace.test(text)) {
            return CommonToken.Whitespace;
        }
        else if (text === SpecialCharacter.EOF) {
            return CommonToken.EOF;
        }

        // Otherwise, identify as unknown.
        return CommonToken.Unknown;
    }

    /**
     * Token definitions.
     */
    protected readonly defs: Map<MatchRule, string>;

    public constructor(defs: Map<MatchRule, string>) {
        this.defs = defs;
    }

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
