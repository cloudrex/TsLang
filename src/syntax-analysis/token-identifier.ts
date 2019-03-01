import {RawToken, TokenType, CommonToken} from "./token";
import Pattern from "../core/pattern";
import SpecialCharacter from "../core/special-character";

export interface ITokenIdentifier {
    identify(text: RawToken): TokenType;
}

export default class TokenIdentifier implements ITokenIdentifier {
    public identify(text: RawToken): TokenType {
        // Test for common tokens.
        if (Pattern.whitepsace.test(text)) {
            return CommonToken.Whitespace;
        }
        else if (text === SpecialCharacter.EOF) {
            return CommonToken.EOF;
        }
        
        // TODO: Test from token declarations.

        return CommonToken.Unknown;
    }
}
