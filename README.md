A strongly-typed programming language built with TypeScript & LLVM. The language is
inspired by JavaScript, TypeScript, React.js, Imba, C#, C++ and various other languages.

The purpose of the language is to be a simply yet powerful general purpose programming language, with the posibility of targeting the web (compiling to JavaScript).

### Syntax

Hello world

```rust
fn main() {
    printf("Hello world");
}
```

#### Decorators

Useful built-in decorators

```rust
@deprecated // Deprecates a method.
fn hello() {
    printf("Hello world!");
}

@transformValue(5) // Transforms return value.
fn giveMeFive() {
    return 7;
}
```

#### DOM

Advanced DOM example

```cs
str @message = "Hello world";
web.El @root = web.html;

// All attempts to access '@message' will be redirected here.
@proxy(@message) => @message + "!";

@route(web.path.root) => @root;

fn main()
    // Redirect to trigger accessing root path.
    => web.get()

    // Redirect root path's output & print DOM to the console.
    | log;
```

Built-in DOM support & direct access

```cs
fn onClick() {
    web.body.push(<div>You clicked the button!</div>);
}

fn main() {
    web.mount(
        <button click={onClick}>Click me</button>
    );
}
```

#### Variables

Local variables

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

#### Functions

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

#### Classes

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

