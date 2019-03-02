import {unit, test} from "unit";
import {Tokenizer} from "../../SyntaxAnalysis/Tokenizer";

@unit("Tokenizer")
default class {
    @test("tokenize(): should return correct tokens")
    public tokenize_returnCorrectTokens() {
        const tokenizer: Tokenizer = Tokenizer.create(new Map([
            ["hello", "HelloWorld"]
        ]));

        tokenizer.tokenize("abcd defg hello hilm")
    }
}
