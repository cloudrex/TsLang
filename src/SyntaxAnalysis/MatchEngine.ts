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

    public static test(@expect(Type.String) text: string, @expect(RegExp, Type.String) rule: MatchRule): boolean {
        if (rule instanceof RegExp) {
            return rule.test(text);
        }

        return rule === text;
    }

    public static partialTest(@expect(Type.String) text: string, @expect(RegExp, Type.String) rule: MatchRule): boolean {
        if (rule instanceof RegExp) {
            return rule.test(text);
        }

        return rule.startsWith(text);
    }
}
