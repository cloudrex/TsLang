## Introduction

This article outlines basic principles, phases, and systems used in compiler design.
At the current time of writing, the article is largely incomplete and missing crucial
concepts such as parsing and code generation which will be implemented later on.

*This article is a [living document](https://en.wikipedia.org/wiki/Living_document).*

Estimated reading time: 5 minutes.

## Tokenization Entities

#### Tokenization Process

The *tokenization process* is a process in which a string (or a sequence of characters) is broken up
into an identified stream of meaningful entities.

The resulting tokens play a vital role in parsing and structuring of a language's syntax.

Please see [Tokenization in Wikipedia](https://en.wikipedia.org/wiki/Lexical_analysis#Tokenization)
for more information.

#### Tokenizer

The *tokenizer* is the entity responsible for performing and handling the tokenization process.

#### Token Type

A *token type* is a unique string used to classify (or categorize) a token.
Conflicting token type declarations will result in an error.

#### Token

A token consists of the following properties:

* **position**: The exact character position of the start of the token's value. This property uniquely identifies the token.
This property is automatically assigned by the tokenizer.

* **type**: A token type. Used to identify and categorize the token.

* **value**: The captured value of the token.
    * If the token rule (see below) used to create this token is a literal rule,
    the value of the token will be the same as the literal rule's value.

#### Token Rule

A *token rule* is used to match, classify, and capture an input string.

A token rule is identified to be either *literal* or *dynamic*.

A **literal** token rule is represented as a string literal value. For example, `'hello'` is a
literal token rule which matches the sequence of characters `hello` with zero or more following
whitespace characters.

Literal token rules should be denoted starting and ending with a single quote to differenciate from
dynamic token rules.

A **dynamic** token rule is represented as a subset of two possible entities:

* A regular expression literal.

* A function of type:

    ```ts
    (input: string) => string | null
    ```

    Where `input` represents the input string being processed.

    The function returns a string representing the captured value
    if the matching process was successfull, or `null` otherwise.

#### Token Rule Collision

A *token rule collision* occurs when two or more token rules successfully match the same input string.

In case of a token rule collision, the following table will determine the action to be taken.

```
literal token rule (2+) => error
dynamic token rule (2+) => error
literal token rule (1=) & dynamic token rule (1+) => literal token rule
```

As you can see, when the conflict only consists of 1 literal token rule and 1 or more dynamic token
rules, the literal token rule will take precedence.

Any other combination in the conflict will result in an error.

>Why should the literal token rule take precedence?
>
>Consider the following inverse token map:
>
>```
>word     : /[a-z]+/
>greeting : 'hello'
>```
>
>Given that we have the following input:
>
>```
>hello world
>```
>
>We'd expect the corresponding tokens to be:
>
>```
>[greeting] [word]
>```
>
>However, if the literal token rule (in this case `greeting`) did not take precedence, the input value
>`hello` would be matched by the dynamic token rule `word` which is not what we'd expect.

#### Token Map

A *token map* is a [Map](https://en.wikipedia.org/wiki/Associative_array) of values where the
keys are token rules and the values are its corresponding token types.

The token map is the bridge connecting token rules to its corresponding token types.

Once a token rule is successfully matched against an input string, the token map will be used
to assign the corresponding token type in the token's creation process.

An *inverse token map* is simply a token map with token types as keys and token rules as values. It is used
throught this article for simplicity's sake.

## Tokenization Process

1. Create the token map.

    The token map is the first entity to be defined due to its importance.
    The token map will contain unique rules as keys and token types as values.

2. Scanning phase.

    Once we have a token map, we can begin to test our rules against our input string.
    A loop called the *scanning loop* will process every character in the input string,
    testing each defined token rule in the token map starting from the current
    character/position of the loop.

    All the token rules will be tested against the current input string, this way
    detecting *collisions*

    Once a token rule is successfully matched, a token will be created containing the
    captured value and corresponding token type.

    The loop's position counter will be increased by the length of any captured value,
    since a value may not be matched multiple times.

## Tokenization Example

Consider the following input:

```
hello world!
```

Given that we have the following inverse token map:

```
start : 'hello'
end   : /world(\!|\.)/
```

The tokenization process is as follows:

```
hello world (0)
^
```

The `(0)` located after the input string represents the current position of the tokenizer.
The `^` below the input string represents the character at the current position of the tokenizer.

Everything after the current character indicator (`^`) is visible, and able to be matched by the
token rules being tested at the current iteration of the scanning loop.

After testing all token rules in our token map, the tokenizer has successfully matched an entry
with the key `start`. The tokenizer will proceed to create the following token:

```
position: 0
type: 'start'
value 'hello'
```

The tokenizer will save the newly created token in an array,
skip 5 characters (which is the length of the matched token rule's
captured value) and continue the tokenization process.

```
hello world (6)
      ^
```

You may have noticed that the tokenizer skipped the space whitespace character, this is because
the matched token rule was a literal token rule. As was previously stated, the tokenizer will
ignore any whitespace characters following a literal token rule's captured value.

Please note this only applies to literal token rules, and not to dynamic token rules.

*to be continued*
