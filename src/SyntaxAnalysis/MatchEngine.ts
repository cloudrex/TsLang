namespace SyntaxAnalysis {
    export type MatchRule = RegExp | string;

    export class MatchEngine {
        public static resolve(@Core.expect(Core.Type.String) value: string): MatchRule {
            if (Core.Pattern.matchRegexRule.test(value)) {
                return new RegExp(value);
            }

            return value;
        }

        public static test(@Core.expect(Core.Type.String) text: string, @Core.expect(RegExp, Core.Type.String) rule: MatchRule): boolean {
            if (rule instanceof RegExp) {
                return rule.test(text);
            }

            return rule === text;
        }
    }
}
