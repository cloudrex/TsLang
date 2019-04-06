A strongly-typed programming language built with TypeScript & LLVM. The language is
inspired by JavaScript, C++ and various other languages.

The purpose of the language is to be a simply yet powerful general purpose programming language, with the posibility of targeting the web (compiling to JavaScript).

### Syntax

Hello world

```rust
fn main() {
    printf("Hello world");
}
```

Variables

```cpp
int year = 2019;

const float e = 2.7;

const double pi = 3.14;

str name = "John Doe";

char sex = 'm';
```

Global variables

```cpp
const double @pi = 3.14;
```

Functions

```rust
fn main() {
    //
}

fn main(): int {
    return 0;
}
```

External declarations

```cpp
extern puts(str);
```

Classes

```cpp
class Person {
    str name;
    int age;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class John : Person {
    constructor() {
        super("John Doe", 0);
    }
}
```

Interfaces

```ts
interface ITalkable {
    talk(): void;
}
```
