import {Expect, Type} from "../Core/Expect";
import {Pattern} from "../Core/Pattern";

export type MatchRule = RegExp | string;

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
     * Returns '0' if input rule is a pattern and does not match text.
     */
    public static lengthOf
    (
        @Expect(RegExp, Type.String) rule: MatchRule,
        @Expect(Type.String) text: string
    ): number {
        if (rule instanceof RegExp) {
            const match: RegExpExecArray | null = rule.exec(text);

            if (match === null) {
                return 0;
            }

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
     * Whitespace is not ignored. Returns matched string if test
     * is successful, otherwise 'null'.
     */
    public static partialTest
    (
        @Expect(Type.String) text: string,
        @Expect(RegExp, Type.String) rule: MatchRule
    ): string | null {
        // Rule is a pattern, attempt to return it's match.
        if (rule instanceof RegExp) {
            const match: RegExpExecArray | null = rule.exec(text);

            return match !== null ? match[0] : null;
        }
        // Rule is a string-literal, attempt to return itself.
        else if (text.startsWith(rule)) {
            return rule;
        }

        // Otherwise, return null.
        return null;
    }
}
