export abstract class Pattern {
    /**
     * Matches any whitespace, including newlines and tabs.
     */
    public static readonly whitepsace: RegExp = /[\s]/;

    /**
     * Matches regex patterns starting and ending with a slash.
     */
    public static readonly matchRegexRule: RegExp = /^\/[^\/]*\/[a-z]*$/;

    public static readonly jsonComment: RegExp = /\/\/[^\n]*/g;
}
