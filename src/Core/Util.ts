export default abstract class Util {
    public static resolveEnum(target: any) {
        return target;
    }

    public static resolveEnumValues<T = string | number>(target: any): Array<T> {
        return Object.values(target);
    }

    public static resolveEnumKeys(target: any): Array<string> {
        return Object.keys(target);
    }
}
