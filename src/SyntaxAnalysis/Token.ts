namespace SyntaxAnalysis {
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
}
