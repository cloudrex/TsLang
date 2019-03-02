import {MatchRule, MatchEngine} from "./MatchEngine";
import {IToken} from "./Token";
import {TokenIdentifier, ITokenIdentifier} from "./TokenIdentifier";
import {SpecialCharacter} from "../Core/SpecialCharacter";

export interface ITokenizer {
    tokenize(input: string): IToken[];
}

/**
 * Processes and breaks up input string into tokens accordingly.
 */
export class Tokenizer implements ITokenizer {
    protected static matchIncomingText(text: string, from: number, rule: MatchRule): boolean {
        return MatchEngine.test(text.substring(from), rule);
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
        // Append the special EOF character to input string.
        input += SpecialCharacter.EOF;

        const result: IToken[] = [];

        for (let i: number = 0; i < input.length; i++) {
            const char: string = input[i];

            // End of file.
            if (char === SpecialCharacter.EOF) {
                break;
            }

            const matches: MatchRule[] = this.filterDefs(input.substring(i));

            // TODO
            console.log(matches);
        }

        return result;
    }

    /**
     * Filter rules from identifier definitions that match input text.
     */
    protected filterDefs(text: string): MatchRule[] {
        const result: MatchRule[] = [];

        for (const rule of this.identifier.defs.keys()) {
            if (MatchEngine.partialTest(text, rule)) {
                result.push(rule);
            }
        }

        return result;
    }
}
