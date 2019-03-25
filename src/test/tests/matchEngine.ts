import {unit, test, Assert, Is, target} from "unit";
import {MatchEngine, MatchRule} from "../../syntaxAnalysis/matchEngine";

@unit("Match Engine")
default class {
    @test("should determine and resolve correct match rule from provided text")
    @target(MatchEngine.resolve)
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

    @test("should match rule should not be affected by flags")
    @target(MatchEngine.resolve)
    public resolve_correctRuleWithFlags() {
        const rule: MatchRule = MatchEngine.resolve("/[a-z]/gi") as RegExp;

        Assert.that(rule, Is.instanceOf(RegExp));
        Assert.false(rule.global);
        Assert.false(rule.ignoreCase);
        Assert.false(rule.multiline);
    }

    @test("should correctly determine whether input text adheres to a rule")
    @target(MatchEngine.test)
    public test_determineCorrectly() {
        const rule: MatchRule = MatchEngine.resolve("test");

        Assert.true(MatchEngine.test("test", rule));
    }

    @test("should correctly determine whether input text adheres to a rule and return matched text")
    @target(MatchEngine.partialTest)
    public partialTest_determineCorrectly() {
        const rule: MatchRule = MatchEngine.resolve("tes");

        Assert.equal(MatchEngine.partialTest("test", rule), "tes");
    }

    @test("should correctly measure length of a string-literal rule")
    @target(MatchEngine.lengthOf)
    public lengthOf_measureLiteral() {
        Assert.equal(MatchEngine.lengthOf(MatchEngine.resolve("test"), "test"), 4);
    }

    @test("should correctly measure length of a regular expression rule")
    @target(MatchEngine.lengthOf)
    public lengthOf_measureExpr() {
        // TODO
    }
}
