import {IToken} from "./token";
import TokenIdentifier, {ITokenIdentifier} from "./token-identifier";
import MatchEngine, {MatchRule} from "./match-engine";
import SpecialCharacter from "../core/special-character";

export interface ITokenizer {
    tokenize(input: string): IToken[];
}

/**
 * Processes and breaks up input string into tokens accordingly.
 */
export default class Tokenizer implements ITokenizer {
    protected matchIncomingText(text: string, from: number, target: string): boolean {
        // TODO
    }

    /**
     * Create a standard Tokenizer class instance.
     */
    public static create(defs: ReadonlyMap<MatchRule, string>): Tokenizer {
        return new Tokenizer(new TokenIdentifier(defs));
    }

    protected readonly identifier: ITokenIdentifier;

    public constructor(identifier: ITokenIdentifier) {
        this.identifier = identifier;
    }

    public tokenize(input: string): IToken[] {
        // Append special EOF character to input string.
        input += SpecialCharacter.EOF;

        const result: IToken[] = [];

        for (let i: number = 0; i < input.length; i++) {
            const char: string = input[i];
        }
    }
}
