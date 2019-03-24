import {MatchRule, MatchEngine} from "./matchEngine";
import {IToken} from "./token";
import {TokenIdentifier, ITokenIdentifier} from "./tokenIdentifier";
import {SpecialCharacter as SpecialChar} from "../core/specialCharacter";
import {ReportError} from "../core/report";
import {CommonTokenType} from "./tokenType";

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

    /**
     * Break up input string into a sequence of identified tokens.
     */
    public tokenize(input: string): IToken[] {
        const result: IToken[] = [];

        for (let i: number = 0; i < input.length; i++) {
            const matches: string[] = this.filterDefs(input.substring(i));

            // Report ambiguous token definitions (2+ matches).
            if (matches.length > 1) {
                throw ReportError.ambiguousTokenDefs();
            }
            // Continue if there was no match.
            else if (matches.length === 0) {
                continue;
            }

            // Skip over matched character(s).
            i += MatchEngine.lengthOf(matches[0], input);

            // Create & append discovered token.
            result.push({
                type: this.identifier.identify(matches[0]),
                value: matches[0]
            });
        }

        // Always append the EOF token.
        result.push({
            type: CommonTokenType.EOF,
            value: SpecialChar.EOF
        });

        return result;
    }

    /**
     * Filter rules from identifier definitions that match input text.
     */
    protected filterDefs(text: string): string[] {
        const result: string[] = [];

        for (const rule of this.identifier.defs.keys()) {
            const test: string | null = MatchEngine.partialTest(text, rule)

            if (test !== null) {
                result.push(test);
            }
        }

        return result;
    }
}
