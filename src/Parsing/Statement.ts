import TokenStream from "../SyntaxAnalysis/TokenStream";

export enum StatementType {
    Expression,
    Assign
}

export interface IStatement {
    readonly type: StatementType;
}

export interface IExpressionStatement extends IStatement {
    // TODO
    readonly expression: any;
}

export interface IAssignStatement extends IStatement {
    readonly variableName: string;
    
    // TODO: Should be expression.
    readonly value: any;
}

export default abstract class StatementParser {
    /**
     * Parse a statement consisting only of an expression.
     */
    public static parseExpression(stream: TokenStream): IExpressionStatement {
        // TODO
        throw new Error("Not yet implemented");
    }
}
