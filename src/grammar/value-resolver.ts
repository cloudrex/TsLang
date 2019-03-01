import expect, {Type} from "../core/expect";
import Pattern from "../core/pattern";

export interface IGrammarValueResolver {
    //
}

export default class GrammarValueResolver implements IGrammarValueResolver {
    /**
     * Break up input into tokens using whitespace as delimiter.
     */
    public static break(@expect(Type.String) value: string): string[] {
        return value.split(Pattern.whitepsace);
    }
}
