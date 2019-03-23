import {Unit, Test, Is, Assert, Target} from "unit";
import {Tokenizer} from "../../SyntaxAnalysis/tokenizer";
import {IToken, TokenDefinition} from "../../SyntaxAnalysis/token";

@Unit("Tokenizer")
default class {
    @Test("Should tokenize input using a pattern rule")
    @Target(Tokenizer.prototype.tokenize)
    public tokenize_pattern() {
        const tokenizer: Tokenizer = Tokenizer.create(new Map([
            TokenDefinition.create("/defg hello/", "Hello")
        ]));

        const tokens: IToken[] = tokenizer.tokenize("abcd defg hello hilm");

        Assert.that(tokens, Is.arrayWithLength(2));
        Assert.equal(tokens[0].type, "Hello");
        Assert.equal(tokens[0].value, "defg hello");
    }

    @Test("Should tokenize input using a repetitive pattern rule")
    @Target(Tokenizer.prototype.tokenize)
    public tokenize_repetitivePattern() {
        const tokenizer: Tokenizer = Tokenizer.create(new Map([
            TokenDefinition.create("/(repeat )+/", "Repetitive")
        ]));

        const tokens: IToken[] = tokenizer.tokenize("hello repeat repeat repeat world");

        console.log(tokens);

        Assert.that(tokens, Is.arrayWithLength(2));
        Assert.equal(tokens[0].type, "Repetitive");
        Assert.equal(tokens[0].value, "repeat repeat repeat ");
    }

    @Test("Should tokenize input using a literal rule")
    @Target(Tokenizer.prototype.tokenize)
    public tokenize_literal() {
        const tokenizer: Tokenizer = Tokenizer.create(new Map([
            TokenDefinition.create("hello", "Hello")
        ]));

        const tokens: IToken[] = tokenizer.tokenize("abcd defg hello hilm");

        Assert.that(tokens, Is.arrayWithLength(2));
        Assert.equal(tokens[0].type, "Hello");
        Assert.equal(tokens[0].value, "hello");
    }

    @Test("Should return correct tokens when provided multiple rules")
    @Target(Tokenizer.prototype.tokenize)
    public tokenize_multiple() {
        const tokenizer: Tokenizer = Tokenizer.create(new Map([
            TokenDefinition.create("/hello/", "Hello"),
            TokenDefinition.create("world", "World")
        ]));

        const tokens: IToken[] = tokenizer.tokenize("defg hello hilm world");

        Assert.that(tokens, Is.arrayWithLength(3));

        // First token 'Hello'.
        Assert.equal(tokens[0].type, "Hello");
        Assert.equal(tokens[0].value, "hello");

        // Second token 'World'.
        Assert.equal(tokens[1].type, "World");
        Assert.equal(tokens[1].value, "world");
    }
}
