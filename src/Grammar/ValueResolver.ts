import {Pattern} from "../Core/Pattern";
import {expect, Type} from "../Core/Expect";

export interface IValueResolver {
    //
}

export class ValueResolver implements IValueResolver {
    /**
     * Break up input into tokens using whitespace as delimiter.
     */
    public static break(@expect(Type.String) value: string): string[] {
        return value.split(Pattern.whitepsace);
    }
}
