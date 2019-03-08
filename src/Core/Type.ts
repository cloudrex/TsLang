export enum SpecialType {
    Void = "void"
}

export enum AtomicType {
    Int = "int",
    Str = "str",
    Short = "short",
    Long = "long",
    Float = "float",
    Double = "double"
}

export type Type = AtomicType | SpecialType;
