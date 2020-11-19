// class RequestLimit {
//     constructor(limit) {
//         this.limit = Number(limit) || 2; // {1}
//         this.blockQueue = []; //阻塞队列
//         this.currentReqNumber = 0;
//     }

//     /**
//      * 请求
//      * @param {*} req 
//      */
//     async request(req) { // {2}
//         if (!req) {
//             throw new Error('req is required.');
//         }
//         if (Object.prototype.toString.call(req) !== '[object Function]') {
//             throw new Error('Req must be a function.');
//         }
//         if (this.currentReqNumber >= this.limit) { // {3}
//             await new Promise(resolve => this.blockQueue.push(resolve)); // 阻塞队列增加一个 Pending 状态的 Promise
//         }


//         //请求是函数类型且请求处理数目未达到2，则正常执行
//         return this._handlerReq(req); // {4}
//     }

//     /**
//      * 内部方法处理请求
//      * @param {*} req 
//      */
//     async _handlerReq(req) {
//         //当前处理请求数目+1
//         this.currentReqNumber++; // {5}
//         try {
//             return await req();
//         } catch (err) {
//             return Promise.reject(err);
//         } finally {
//             this.currentReqNumber--;
//             if (this.blockQueue.length) {
//                 this.blockQueue[0](); // 将最先进入阻塞队列的 Promise 从 Pending 变为 Fulfilled(执行态)
//                 this.blockQueue.shift(); // 每完成一个就从阻塞队列里剔除一个
//             }
//         }
//     }
// }


// function NumToTag(tag) {
//     const reg = /^[a-zA-Z]([0-9]*)$/;
//     if (reg.test(tag)) {
//         return tag
//     }
//     const alphabet = String.fromCharCode(parseInt(tag.substring(0, 2)) + 64);
//     const endfix = tag.substring(2, tag.length);
//     return `${alphabet}${Number(endfix)}`
// }

// let tag = '0211'
// console.log(NumToTag(tag))\

// var a = 20;

// function foo() {
//     if (!a) {
//         a = 100;
//     }

//     var a = 10;

//     return a;
// }

// console.log(foo());


// var fn = null;

// function foo() {
//     var a = 2;

//     function innnerFoo() {
//         console.log(a);
//     }
//     fn = innnerFoo; // 将 innnerFoo的引用，赋值给全局变量中的fn
// }

// function bar() {
//     fn(); // 此处的保留的innerFoo的引用
// }

// foo();
// bar(); // 2

// var a = 20;

// function fn() {
//     console.log(this.a);
// }
// fn();

// var a = 20;

// function fn() {
//     function foo() {
//         console.log(this.a);
//     }
//     foo();
// }
// fn();

// var a = 20;

// function foo() {
//     var a = 1;
//     var obj = {
//         a: 10,
//         c: this.a + 20,
//         fn: function() {
//             return this.a;
//         }
//     }
//     return obj.c;
// }
// console.log(foo()); // ？
// console.log(window.foo()); // ?


// var a = 20;

// function getA() {
//     return this.a;
// }
// var foo = {
//     a: 10,
//     getA: getA
// }
// console.log(foo.getA()); // 10

// let url = require("url");
// console.log(url.parse('http://stackoverflow.com:3000/questions/17184791?name=ben&age=8'))



// var util = require('util');

// function Person() {
//     this.name = 'byvoid';
//     this.toString = function() {
//         return this.name;
//     };
// }
// var obj = new Person();
// console.log(util.inspect(obj, true));
// console.log(JSON.stringify(obj))
// console.log(obj.toString())

// let str = `hello\n
// world\n `
// console.log(str)
// let multiLineString = `some string\n
// with multi-line of\n
// characters\n`

// console.log(multiLineString)

// let someFuncThatReturnSomeValue = (value) => (
//     value + value
// )
// console.log(someFuncThatReturnSomeValue('前端小智'))

// let val = '123.95'

// console.log(Math.floor(val)) // 常规写法
// console.log(~~val) // 简写

// Math.pow(2, 3) // 8
//     // 简写
//     // 2 ** 3 // 8
// console.log(2 ** 4)
// const num1 = parseInt('100')
//     // 简写
// console.log(+"100")
// console.log(+"100.2")

// let obj = {
//     name: 'asdjfad'
// }

// let test = obj.hhhh && obj.name
// let test1 = obj.hhhh ?.obj.name
// console.log(test1)



// class Chameleon {
//     static colorChange(newColor) {
//         this.newColor = newColor;
//     };
//     //当你要解构的属性未定义时你可以提供一个默认值：
//     constructor({ newColor = "green" } = {}) {
//         console.log(newColor)
//         this.newColor = newColor;
//     }
// }
// const freddie = new Chameleon({ newColor: "purple" });
// // 静态方法仅在创建它们的构造函数中存在，并且不能传递给任何子级
// freddie.colorChange("orange");





// function bark() {
//     console.log("Woof!");
// }
// bark.animal = "dog";




// function Person(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
// }
// const member = new Person("Lydia", "Hallie");
//构造函数不能像不同对象一样添加属性
// Person.getFullName = () => this.firstName + this.lastName;
// console.log(member.getFullName());




// function getPersonInfo(one, two, three) {
//     console.log(one);
//     console.log(two);
//     console.log(three);
// }
// const person = "Lydia";
// const age = 21;
// //getPersonInfo 是一个标签函数，用于处理模板字符串
// // 1、可自定义标签函数
// // 2、js内置函数也可作为标签函数，但是需要考虑入参数量，及处理逻辑
// getPersonInfo `${person} is ${age} years old`;




// const set = new Set([1, 2, 3])





//小坑（Object.protoType.toString.call()）
// const a = {};
// const b = { key: "b" };
// const c = { key: "c" };
// a[b] = 123;
// a[c] = 456;
// console.log(a[b]);





//函数参数为浅拷贝（属性的复制）
// const obj = {
//     a: {
//         name: 'ben'
//     },
//     b: 1
// }
// function test({ a, b }) {
//     a.name = 'perdream'
//     b = 10
// }
// test(obj)
// console.log(obj.a.name, obj.b)



//超出数组长度赋值
// const numbers = [1, 2, 3];
// numbers[10] = 11;
// console.log(numbers);



//(x = 1), (y = 2)?
// (() => {
//     let x, y;
//     try {
//         throw new Error();
//     } catch (x) {
//         (x = 1), (y = 2);//?
//         console.log(x);
//     }
//     console.log(x);
//     console.log(y);
// })();