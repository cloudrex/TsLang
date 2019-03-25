import {Expect, Type} from "../core/expect";
import {Pattern} from "../core/pattern";

export type MatchRule = RegExp | string;

export interface IPartialTestResult {
    /**
     * The captured value, otherwise the entire input string.
     */
    readonly capturedValue: string;

    /**
     * The entire input string.
     */
    readonly value: string;

    /**
     * The length of the input string.
     * Used in the tokenize method to skip over
     * matched characters.
     */
    readonly length: number;
}

export class MatchEngine {
    public static resolve(@Expect(Type.String) value: string): MatchRule {
        if (Pattern.matchRegexRule.test(value)) {
            // Create expression and remove first + last characters of value (regex delimiters '/').
            // '^' is appended at the start to match strings starting with resolved value,
            // otherwise multiple same values will occur.
            return new RegExp("^" + value.substring(1)
                .substring(0, value.length - 2));
        }

        return value;
    }

    /**
     * Computes the exact length of a possible matched token by a rule.
     * Returns '-1' if input rule is a pattern and does not match text.
     * Generally, partial test result's length property is preferred
     * over this method.
     */
    public static lengthOf
    (
        @Expect(RegExp, Type.String) rule: MatchRule,
        @Expect(Type.String) text: string
    ): number {
        if (rule instanceof RegExp) {
            const match: RegExpExecArray | null = rule.exec(text);

            if (match === null) {
                return -1;
            }

            // Return the length of the entire matched string.
            return match[0].length;
        }

        return rule.length;
    }

    /**
     * Tests rule against input text. Whitespace is not ignored.
     */
    public static test
    (
        @Expect(Type.String) text: string,
        @Expect(RegExp, Type.String) rule: MatchRule
    ): boolean {
        if (rule instanceof RegExp) {
            return rule.test(text);
        }

        return rule === text;
    }

    /**
     * Tests rule against the beginning of input text.
     * Whitespace is not ignored. Returns matched string
     * and captured value if test is successful, otherwise 'null'.
     */
    public static partialTest
    (
        @Expect(Type.String) text: string,
        @Expect(RegExp, Type.String) rule: MatchRule
    ): IPartialTestResult | null {
        // Rule is a pattern, attempt to return it's match.
        if (rule instanceof RegExp) {
            const match: RegExpExecArray | null = rule.exec(text);

            // Pattern did not match.
            if (match === null) {
                return null;
            }

            const capturedValue: string = match[1] || match.input;

            // Return an object with the input string, and the captured value (if applicable).
            return {
                capturedValue,
                value: match.input,
                length: capturedValue.length
            };
        }
        // Rule is a string-literal, attempt to return itself.
        else if (text.startsWith(rule)) {
            return {
                capturedValue: rule,
                value: rule,
                length: rule.length
            };
        }

        // Otherwise, return null.
        return null;
    }
}
