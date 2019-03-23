export enum ErrorCode {
    UnexpectedToken = 1,
    AmbiguousTokenDefs
}

export enum ErrorType {
    UnexpectedEntity,
    Conflict
}

export default abstract class Report {
    /**
     * Create an error with the specified message.
     */
    public static error(type: ErrorType, code: number, message: string): Error {
        return new Error(`(${code}:${type.toString()}) Error: ${message}`);
    }
}

export abstract class ReportError {
    public static unexpectedToken(): Error {
        return Report.error(ErrorType.UnexpectedEntity, ErrorCode.UnexpectedToken, "Unexpected token");
    }

    public static ambiguousTokenDefs(): Error {
        return Report.error(ErrorType.Conflict, ErrorCode.AmbiguousTokenDefs, "Ambiguous token definitions");
    }
}
