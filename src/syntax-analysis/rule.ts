import {Sequence, TokenSequence} from "./sequence";
import {IToken} from "./token";

export interface IRule {
    readonly name: string;
    readonly sequence: TokenSequence;
}

export class Rule implements IRule {
    public readonly name: string;
    public readonly sequence: Sequence<IToken>;

    public constructor(name: string, sequence: TokenSequence) {
        this.name = name;
        this.sequence = sequence;
    }
}
