import {unit, test, Assert, Is, JsType, Does} from "unit";
import {GrammarResolver} from "../../Grammar/GrammarResolver";

@unit("Grammar Value Resolver")
default class {
    @test("break(): should correctly tokenize input into an array")
    public break_correctlyTokenize() {
        Assert.that(GrammarResolver.break("hello world"),
            Is.arrayOf(JsType.String),
            Is.arrayWithLength(2),
            Does.contain("hello"),
            Does.contain("world")
        );
    }
}
