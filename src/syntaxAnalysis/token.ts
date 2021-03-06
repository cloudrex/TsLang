import {MatchRule, MatchEngine} from "./matchEngine";

export interface IToken<T extends string = string> {
    readonly type: T;
    readonly value: string;
}

export type RawToken = string;

export type TokenDef = [MatchRule, string];

export class TokenDefinition {
    public static create(value: string, name: string): TokenDef {
        return [MatchEngine.resolve(value), name];
    }

    /**
     * Create an array of token definitions from an object-like entity (maps, objects).
     */
    public static fromObjLike(obj: any): Array<TokenDef> {
        const result: Array<TokenDef> = [];

        // Obj is a map.
        if (obj instanceof Map) {
            for (const [key, value] of obj) {
                result.push(TokenDefinition.create(key.toString(), value));
            }
        }
        // Otherwise, a normal object.
        else {
            for (const [key, value] of Object.entries(obj)) {
                result.push(TokenDefinition.create(value.toString(), key));
            }
        }

        return result;
    }
}
