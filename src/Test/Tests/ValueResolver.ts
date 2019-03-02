import {unit, test, Assert, Is, JsType, Does} from "unit";

@unit("Grammar Value Resolver")
default class {
    @test("break(): should correctly tokenize input into an array")
    public break_correctlyTokenize() {
        Assert.that(Grammar.ValueResolver.break("hello world"),
            Is.arrayOf(JsType.String),
            Is.arrayWithLength(2),
            Does.contain("hello"),
            Does.contain("world")
        );
    }
}
