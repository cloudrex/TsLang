import {Unit, Test, Assert, Is, JsType, Does, Target} from "unit";
import {GrammarResolver} from "../../grammar/grammarResolver";

@Unit("Grammar Value Resolver")
default class {
    @Test("Should correctly tokenize input into an array")
    @Target(GrammarResolver.break)
    public break_correctlyTokenize() {
        Assert.that(GrammarResolver.break("hello world"),
            Is.arrayOf(JsType.String),
            Is.arrayWithLength(2),
            Does.include("hello"),
            Does.include("world")
        );
    }
}
