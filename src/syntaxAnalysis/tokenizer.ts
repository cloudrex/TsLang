import {MatchRule, MatchEngine} from "./matchEngine";
import {IToken} from "./token";
import {TokenIdentifier, ITokenIdentifier} from "./tokenIdentifier";
import {ReportError} from "../core/report";
import {ConflictResolver} from "./conflictResolver";

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

        // Loop through all characters in the input string.
        for (let i: number = 0; i < input.length; i++) {
            const match: string | null = this.processDefs(input.substring(i));

            // Continue if there was no match.
            if (match === null) {
                continue;
            }

            // Compute matched character(s)' length.
            const length: number = MatchEngine.lengthOf(match, input);

            // Skip over matched character(s) if applicable.
            if (length !== -1) {
                i += length;
            } 

            // Create & append discovered token.
            result.push({
                type: this.identifier.identify(match),
                value: match
            });
        }

        return result;
    }

    /**
     * Process token definition rules from identifier
     * definitions that match input text. Returns null
     * if there was no match.
     */
    protected processDefs(text: string): string | null {
        const matches: Map<MatchRule, string> = new Map();

        let result: string | null = null;

        for (const rule of this.identifier.defs.keys()) {
            const test: string | null = MatchEngine.partialTest(text, rule);

            // Test was positive, save the rule and prepare the result.
            if (test !== null) {
                matches.set(rule, test);

                // Set the result, will be changed if there are more than 1 matches.
                result = test;
            }
        }

        // Process ambiguous token definitions (2+ matches).
        if (matches.size > 1) {
            // Cannot resolve conflicting token definitions of >2.
            if (matches.size > 2) {
                throw ReportError.ambiguousTokenDefs();
            }

            // Extract matches from the map.
            let ruleA: MatchRule | null = null;
            let ruleB: MatchRule | null = null;

            for (const rule of matches.keys()) {
                if (ruleA !== null) {
                    ruleB = rule;

                    break;
                }

                ruleA = rule;
            }

            // Attempt to resolve conflict.
            const resolvedResult: MatchRule | null = ConflictResolver.resolve(ruleA!, ruleB!);

            // Unable to resolve conflict, report to the console.
            if (resolvedResult === null) {
                throw ReportError.ambiguousTokenDefs();
            }

            // Otherwise, assign the result to the resolved value.
            result = matches.get(resolvedResult)!;
        }

        return result;
    }
}
