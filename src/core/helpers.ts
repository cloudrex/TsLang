/**
 * Removes read-only modifiers from target.
 */
export type Mutable<T> = {-readonly [P in keyof T]: T[P]};
