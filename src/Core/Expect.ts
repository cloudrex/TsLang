export enum Type {
    Object = "object",
    String = "string",
    Number = "number"
}

export function expect(...types: Array<Type | any>): any {
    return function (target: any, prop: string) {
        // Verify all provided types.
        for (const type of types) {
            if (Type[type] === undefined) {
                throw new Error("An invalid type was provided");
            }
            else if (typeof target[prop] !== type) {
                throw new Error(`Expected parameter '${prop}' to be of type '${type}' but got '${typeof target[prop]}' instead`);
            }
        }

        return target;
    }
}
