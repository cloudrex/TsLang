import {Pattern} from "./pattern";

export default abstract class Util {
    // TODO: Convert to a map.
    public static resolveEnum(target: any) {
        return target;
    }

    public static resolveEnumValues<T = string | number>(target: any): Array<T> {
        return Object.values(target);
    }

    public static resolveEnumKeys(target: any): Array<string> {
        return Object.keys(target);
    }

    /**
     * Remove double-slash comments from a JSON string.
     */
    public static removeJsonComments(jsonStr: string): string {
        while (Pattern.jsonComment.test(jsonStr)) {
            jsonStr = jsonStr.replace(Pattern.jsonComment, "");
        }

        return jsonStr;
    }
}
