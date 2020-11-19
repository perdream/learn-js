// function foo(name, age, sex) {


//     //arguments 存储传入实参的个数
//     console.log(arguments.length);
//     console.log(foo.length)
// }

// foo("name");

// let data = [];

// //??
// for (var i = 0; i < 3; i++) {
//     (data[i] = function() {
//         console.log(arguments.callee.i);
//         console.log(arguments.callee);
//     }).i = i;
// }

// data[0]();
// data[1]();
// data[2]();

// "use strict"

function foo(name, age, sex, hobbit) {
    console.log(name, arguments[0]); // name name

    // 改变形参
    name = "new name";

    console.log(name, arguments[0]); // new name new name

    // 改变arguments
    arguments[1] = "new age";

    console.log(age, arguments[1]); // new age new age

    // 测试未传入的是否会绑定
    console.log(sex); // undefined

    sex = "new sex";

    console.log(sex, arguments[2]); // new sex undefined

    arguments[3] = "new hobbit";

    console.log(hobbit, arguments[3]); // undefined new hobbit
}

foo("name", "age");

//   传入的参数，实参和 arguments 的值会共享，当没有传入时，实参与 arguments 值不会共享
// 除此之外，以上是在非严格模式下，如果是在严格模式下，实参和 arguments 是不会共享的。


// 使用 apply 将 foo 的参数传递给 bar
function foo() {
    bar.apply(this, arguments);
}

function bar(a, b, c) {
    console.log(a, b, c);
}

foo(1, 2, 3);


// 使用 ES6 的 ... 运算符，我们可以轻松转成数组。
function func(...arguments) {
    console.log(arguments); // [1, 2, 3]
}

func(1, 2, 3);