namespace Grammar {
    export interface IValueResolver {
        //
    }

    export class ValueResolver implements IValueResolver {
        /**
         * Break up input into tokens using whitespace as delimiter.
         */
        public static break(@Core.expect(Core.Type.String) value: string): string[] {
            return value.split(Core.Pattern.whitepsace);
        }
    }
}
