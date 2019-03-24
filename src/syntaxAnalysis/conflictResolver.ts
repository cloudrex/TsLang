import {MatchRule} from "./matchEngine";

/**
 * Resolves conflicts caused by ambiguous token definitions.
 */
export abstract class ConflictResolver {
    /**
     * Attempt to resolve a token definition conflict.
     * Returns null if the conflict cannot be resolved,
     * otherwise a string.
     */
    public static resolve(ruleA: MatchRule, ruleB: MatchRule): MatchRule | null {
        // Cannot resolve between same rule types.
        if (typeof ruleA === typeof ruleB) {
            return null;
        }
        // String-literal rule gains priority.
        else if (typeof ruleA === "string") {
            return ruleA;
        }

        // Otherwise, the string-literal is ruleB.
        return ruleB;
    }
}
