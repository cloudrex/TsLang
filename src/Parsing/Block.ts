import TokenStream from "../SyntaxAnalysis/TokenStream";
import {IStatement} from "./Statement";

export interface IBlock {
    readonly statements: IStatement;
}

export interface INamedBlock extends IBlock {
    readonly name: string;
}

export default abstract class BlockParser {
    /**
     * Parse an unnamed block.
     */
    public static parseUnnamed(stream: TokenStream): IBlock {
        // TODO: Implement.
        throw new Error("Not yet implemented");
    }
}
