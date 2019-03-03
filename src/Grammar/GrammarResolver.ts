import {Pattern} from "../Core/Pattern";
import {Expect, Type} from "../Core/Expect";

export interface IGrammarResolver {
    //
}

export class GrammarResolver implements IGrammarResolver {
    /**
     * Break up input into tokens using whitespace as delimiter.
     */
    public static break(@Expect(Type.String) value: string): string[] {
        return value.split(Pattern.whitepsace);
    }
}
