export abstract class Pattern {
    /**
     * Matches any whitespace, including newlines and tabs.
     */
    public static whitepsace: RegExp = /[\s]/;

    public static readonly matchRegexRule: RegExp = /^\/[^*]*\/[a-z]*$/;
}
