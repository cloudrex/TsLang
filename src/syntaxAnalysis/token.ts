import {MatchRule, MatchEngine} from "./matchEngine";
import {TokenType} from "./tokenType";

export interface IToken {
    readonly type: TokenType;
    readonly value: string;
}

export type RawToken = string;

export type TokenDef = [MatchRule, string];

export class TokenDefinition {
    public static create(value: string, name: string): [MatchRule, string] {
        return [MatchEngine.resolve(value), name];
    }

    /**
     * Create an array of token definitions from an object.
     */
    public static fromObj(obj: any): Array<TokenDef> {
        const result: Array<TokenDef> = [];

        for (const [key, value] of Object.entries(obj)) {
            result.push(TokenDefinition.create(value.toString(), key));
        }

        return result;
    }
}
