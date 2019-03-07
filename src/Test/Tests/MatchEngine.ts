import {Unit, Test, Assert, Is, Target} from "unit";
import {MatchEngine, MatchRule} from "../../SyntaxAnalysis/MatchEngine";

@Unit("Match Engine")
default class {
    @Test("Should determine and resolve correct match rule from provided text")
    @Target(MatchEngine.resolve)
    public resolve_correctRule() {
        const regexRule: RegExp = MatchEngine.resolve("/[a-z]/") as RegExp;

        // Assert regex rule.
        Assert.that(regexRule, Is.instanceOf(RegExp));
        Assert.equal(regexRule.source, "^[a-z]");
        Assert.false(regexRule.global);
        Assert.false(regexRule.ignoreCase);
        Assert.false(regexRule.multiline);

        // Assert literal rule.
        Assert.equal(MatchEngine.resolve("test"), "test");
    }

    @Test("Should match rule should not be affected by flags")
    @Target(MatchEngine.resolve)
    public resolve_correctRuleWithFlags() {
        const rule: MatchRule = MatchEngine.resolve("/[a-z]/gi") as RegExp;

        Assert.that(rule, Is.instanceOf(RegExp));
        Assert.false(rule.global);
        Assert.false(rule.ignoreCase);
        Assert.false(rule.multiline);
    }

    @Test("Should correctly determine whether input text adheres to a rule")
    @Target(MatchEngine.test)
    public test_determineCorrectly() {
        const rule: MatchRule = MatchEngine.resolve("test");

        Assert.true(MatchEngine.test("test", rule));
    }

    @Test("Should correctly determine whether input text adheres to a rule and return matched text")
    @Target(MatchEngine.partialTest)
    public partialTest_determineCorrectly() {
        const rule: MatchRule = MatchEngine.resolve("tes");

        Assert.equal(MatchEngine.partialTest("test", rule), "tes");
    }

    @Test("Should correctly measure length of a string-literal rule")
    @Target(MatchEngine.lengthOf)
    public lengthOf_measureLiteral() {
        Assert.equal(MatchEngine.lengthOf(MatchEngine.resolve("test"), "test"), 4);
    }

    @Test("Should correctly measure length of a regular expression rule")
    @Target(MatchEngine.lengthOf)
    public lengthOf_measureExpr() {
        // TODO
    }
}
