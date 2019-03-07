import Util from "../Core/Util";

export enum CommonTokenType {
    Unknown = -1,
    EOF = -2,
    Whitespace = -3
}

export enum BasicTokenType {
    Id = "/[a-z]/",
    StringLiteral = "/\"[^]*\"/"
}

export enum KeywordTokenType {
    Fn = "fn",
    Return = "ret",
    Var = "var",
    Exit = "exit"
}

export enum VarTokenType {
    Int = "int",
    Float = "float",
    Long = "long",
    Short = "short",
    Double = "double"
}

export type TokenTypeValue = string | number;

export type TokenType = CommonTokenType | KeywordTokenType | BasicTokenType | VarTokenType | string;

export abstract class TokenTypeValues {
    public static getAllTypes(): TokenTypeValue[] {
        return TokenTypeValues.getStringTypes()
            .concat(TokenTypeValues.getNumberTypes() as any);
    }

    public static getStringTypes(): string[] {
        return Util.resolveEnumValues(BasicTokenType)
            .concat(Util.resolveEnumValues(VarTokenType))
            .concat(Util.resolveEnumValues(KeywordTokenType)) as string[];
    }

    public static getNumberTypes(): number[] {
        return Util.resolveEnumValues(CommonTokenType) as number[];
    }
}
