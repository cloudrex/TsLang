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

    /**
     * Reverse a map, settings its keys as its values
     * and vice-versa.
     */
    public static reverseMap(map: Map<any, any>): Map<any, any> {
        const result: Map<any, any> = new Map();

        for (const [key, value] of map) {
            // Ensure values aren't repeated.
            if (result.has(value)) {
                throw new Error("Value already exists on reversed map");
            }

            result.set(value, key);
        }

        return result;
    }
}
