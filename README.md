# babel-plugin-nameof

A babel plugin that provides C# style `nameof` function for string-literal type safety when using TypeScript.

Turn this:
``` typescript
/// <reference path="./node_modules/babel-plugin-nameof/nameof.d.ts" />

interface IGreeter {
    name: string;
    greet(): void;
}

console.log(nameof<IGreeter>(x => x.name));
console.log(nameof<IGreeter>(x => x.greet));

let foo = {
    bar: 1,
    baz: {
        quux: 123
    }
};

console.log(nameof(foo.bar));
console.log(nameof(foo.baz.quux));
```

Into this:
``` javascript
console.log("name");
console.log("greet");
var foo = {
    bar: 1,
    baz: {
        quux: 123
    }
};
console.log("bar");
console.log("quux");

```
