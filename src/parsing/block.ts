import TokenStream from "../syntaxAnalysis/tokenStream";
import {IStatement} from "./statement";

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
