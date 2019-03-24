export abstract class Pattern {
    /**
     * Matches any whitespace, including newlines and tabs.
     */
    public static readonly whitepsace: RegExp = /[\s]/;

    public static readonly matchRegexRule: RegExp = /^\/[^*]*\/[a-z]*$/;

    public static readonly jsonComment: RegExp = /\/\/[^\n]*/g;
}
