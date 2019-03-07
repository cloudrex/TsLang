import {MatchRule, MatchEngine} from "./MatchEngine";

export enum CommonTokenType {
    Unknown = -1,
    EOF = -2,
    Whitespace = -3
}

export type TokenType = CommonTokenType | string;

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
