import {expect, Type} from "../Core/Expect";
import {Pattern} from "../Core/Pattern";

export type MatchRule = RegExp | string;

export class MatchEngine {
    public static resolve(@expect(Type.String) value: string): MatchRule {
        if (Pattern.matchRegexRule.test(value)) {
            return new RegExp(value);
        }

        return value;
    }

    /**
     * Computes the exact length of a possible matched token by a rule.
     */
    public static lengthOf(@expect(RegExp, Type.String) rule: MatchRule): number {
        if (rule instanceof RegExp) {
            console.log(rule);

            // TODO
            return -1;
        }

        return rule.length;
    }

    /**
     * Tests rule against input text. Whitespace is not ignored.
     */
    public static test(@expect(Type.String) text: string, @expect(RegExp, Type.String) rule: MatchRule): boolean {
        if (rule instanceof RegExp) {
            return rule.test(text);
        }

        return rule === text;
    }

    /**
     * Tests rule against the beginning of input text. Whitespace is not ignored.
     */
    public static partialTest(@expect(Type.String) text: string, @expect(RegExp, Type.String) rule: MatchRule): boolean {
        if (rule instanceof RegExp) {
            return rule.test(text);
        }

        return text.startsWith(rule);
    }
}
