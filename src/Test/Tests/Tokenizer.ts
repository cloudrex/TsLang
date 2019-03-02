import {unit, test, Is, Assert} from "unit";
import {Tokenizer} from "../../SyntaxAnalysis/Tokenizer";
import {IToken, TokenDefinition} from "../../SyntaxAnalysis/Token";

@unit("Tokenizer")
default class {
    @test("tokenize(): should return correct tokens")
    public tokenize_returnCorrectTokens() {
        const tokenizer: Tokenizer = Tokenizer.create(new Map([
            TokenDefinition.create("/hello/", "HelloWorld")
        ]));

        const tokens: IToken[] = tokenizer.tokenize("abcd defg hello hilm");

        Assert.that(tokens, Is.arrayWithLength(1));
    }
}
