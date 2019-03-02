import {MatchRule, MatchEngine} from "./MatchEngine";

export enum CommonToken {
    Unknown = -1,
    EOF = -2,
    Whitespace = -3
}

export type TokenType = CommonToken | string;

export interface IToken {
    readonly type: TokenType;
    readonly value: string;
}

export type RawToken = string;

export class TokenDefinition {
    public static create(value: string, name: string): [MatchRule, string] {
        return [MatchEngine.resolve(value), name];
    }
}
