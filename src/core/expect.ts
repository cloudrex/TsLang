export enum Type {
    Object = "object",
    String = "string",
    Number = "number"
}

export function Expect(...types: Array<Type | any>): any {
    return function (target: any, prop: string) {
        // TODO: 'target' is method's class. Need to access actual parameter.
        return;

        // Verify all provided types.
        for (const type of types) {
            // Type is an instance.
            if (typeof type !== "string" && !(target[prop] instanceof type)) {
                throw new Error(`Expected parameter '${prop}' to be an instance of type '${type}'`);
            }
            // Type is a common type.
            else if (typeof target[prop] !== type) {
                throw new Error(`Expected parameter '${prop}' to be of type '${type}' but got '${typeof target[prop]}' instead`);
            }
        }

        return target;
    }
}
