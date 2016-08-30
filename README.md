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

# Usage
For whatever reason, every TypeScript developer I talk to is convinced they aren't allowed to use babel. However, they work great together. babel is amazingly powerful and by implementing this transform using babel you can use it with any toolchain that supports it (virtually all of them).

## webpack
```
npm install --save-dev typescript webpack ts-loader babel-loader babel-plugin-nameof
```
``` javascript
// webpack.config.js
module.exports = {
    entry: "./app.ts",
    output: {
        filename: "bundle.js"
    },
    resolve: {
        extensions: [ "", ".ts", ".tsx" ]
    },
    module: {
        loaders: [
            { 
                test: /\.tsx?$/, 
                loaders: [ "babel-loader?plugins[]=nameof", "ts-loader" ]
            }
        ]
    }
}
```

## gulp
```
npm install -g gulp-cli
npm install --save-dev typescript gulp gulp-typescript gulp-babel babel-plugin-nameof
```
``` javascript
// gulpfile.js

var gulp = require("gulp");
var ts = require("gulp-typescript");
var babel = require("gulp-babel");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(ts(tsProject)).js
        .pipe(babel({
            plugins: [ "nameof" ]
        }))
        .pipe(gulp.dest("dist"));
});
```

## Command line
```
npm install --save-dev typescript babel-cli babel-plugin-nameof
tsc app.ts && babel app.js --plugins nameof --out-file result.js
```
