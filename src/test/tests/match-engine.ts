import {unit, test, Assert, Is, Does} from "unit";
import MatchEngine from "../../syntax-analysis/match-engine";

@unit("Match Engine")
export default class {
    @test("resolve(): should determine and resolve correct match rule from provided text")
    public resolve_correctRule() {
        const regexRule: RegExp = MatchEngine.resolve("/[a-z]/") as RegExp;

        // Assert regex rule.
        Assert.that(regexRule, Is.instanceOf(RegExp));
        Assert.equal(regexRule.source, "\\/[a-z]\\/");
        Assert.false(regexRule.global);
        Assert.false(regexRule.ignoreCase);
        Assert.false(regexRule.multiline);

        // Assert literal rule.
        Assert.equal(MatchEngine.resolve("test"), "test");
    }

    @test("resolve(): match rule should not be affected by flags")
    public resolve_correctRuleWithFlags() {
        const rule: RegExp = MatchEngine.resolve("/[a-z]/gi") as RegExp;

        Assert.that(rule, Is.instanceOf(RegExp));
        Assert.false(rule.global);
        Assert.false(rule.ignoreCase);
        Assert.false(rule.multiline);
    }
}
