export type MatchRule = RegExp | string;

export default class MatchEngine {
    public static resolve(text: string): MatchRule {
        if (text.startsWith("/") && text.endsWith("/")) {
            return new RegExp(text);
        }

        return text;
    }

    public static test(text: string, rule: MatchRule): boolean {
        if (rule instanceof RegExp) {
            return rule.test(text);
        }

        return rule === text;
    }
}
