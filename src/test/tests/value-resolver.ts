import {unit, test, Assert, Is, JsType, Does} from "unit";
import GrammarValueResolver from "../../grammar/value-resolver";

@unit("Grammar Value Resolver")
export default class {
    @test("break(): should correctly tokenize input into an array")
    public break_correctlyTokenize() {
        Assert.that(GrammarValueResolver.break("hello world"),
            Is.arrayOf(JsType.String),
            Is.arrayWithLength(2),
            Does.contain("hello"),
            Does.contain("world")
        );
    }
}
