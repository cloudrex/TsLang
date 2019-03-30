import {Pattern} from "./pattern";

export type EnumMap<T = string | number> = Map<string, T>;

export default abstract class Util {
    /**
     * Converts target enum to a Map with
     * the corresponding keys and values.
     */
    public static resolveEnum<T = string | number>(target: any): EnumMap<T> {
        const result: EnumMap<T> = new Map();

        for (const [key, value] of Object.entries(target)) {
            // Ensure all source keys are unique.
            if (result.has(key)) {
                throw new Error("Expected target enum to contain unique keys");
            }

            result.set(key, value as T);
        }

        return result;
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
        // Replace & remove comments while comment pattern matches.
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
                throw new Error("Expected source values to be unique");
            }

            result.set(value, key);
        }

        return result;
    }
}
