export enum Type {
    Object = "object",
    String = "string",
    Number = "number"
}

export default function expect(...type: Array<Type | any>): any {
    return function (target: any) {
        // TODO
        console.log(target);

        return target as any;
    }
}
