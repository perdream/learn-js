// console.log('main 开始');
// const a = require('./a.js');
// const b = require('./b.js');
// console.log('在 main 中，a.done=%j，b.done=%j', b.done);
// const str = 'enj70k2pf965crbpa8wmwghf88r74wb95x8k2wj7cn772ya690wp4uu1axj6mx1gcgvn4wun60nm2uvkchx62gv69cvm2njjcnhpuc1hdhjp8kv86wrm2dun7m'
// console.log(str.length)

// let l = [1, 2, 3]
// let k = [2, 3, 4]

// l = l.concat(k)

// const tmp = new Set(l)

// console.log(tmp)

// var timer = setTimeout(function() {
//     console.log('setTimeout actions.');
// }, 0);

// console.log('other actions.');
// console.log(timer);

// setTimeout(function() {
//     console.log(a);
// }, 0);

// var a = 10;

// console.log(b); //undefined
// console.log(fn); //function 

// var b = 20;

// function fn() {
//     setTimeout(function() {
//         console.log('setTImeout 10ms.');
//     }, 10);
// }

// fn.toString = function() {
//     return 30;
// }

// console.log(fn);

// setTimeout(function() {
//     console.log('setTimeout 20ms.');
// }, 20);

// fn();

//undefined
//function {
// Timeout
// }
//function{
// Timeout，
// toString
// }
// 10
//setTimeout 10ms
//setTimeout 2oms


// var a = 20;

// function foo() {
//     var a = 1;
//     var obj = {
//         a: 10,
//         c: this.a + 20,
//         fn: function() {
//             'use strict'
//             console.log(this)
//             return this.a;
//         }
//     }
//     return obj.fn;
// }
// // console.log(foo());
// // console.log(window.foo())
// const tmp_fn = foo();
// console.log(tmp_fn())


// function fn() {
//     'use strict';
//     console.log(this);
// }

// fn();
// window.fn();


// var a = 20;
// var foo = {
//     a: 10,
//     getA: function() {
//         return this.a;
//     }
// }
// console.log(foo.getA()); // 10

// var test = foo.getA;
// // 'use struct'
// console.log(test()); // 20

// var a = 20;
// function getA() {
//   return this.a;
// }
// var foo = {
//   a: 10,
//   getA: getA
// }
// console.log(foo.getA());  // 10


// function foo() {
//     console.log(this)
//     console.log(this.a)
// }

// function active(fn) {
//     fn(); // 真实调用者，为独立调用
// }

// var a = 20;
// var obj = {
//     a: 10,
//     getA: foo
// }

// active(obj.getA);

// function exam(a, b, c, d, e) {

//     // 先看看函数的自带属性 arguments 什么是样子的
//     console.log(arguments); //{ '0': 2, '1': 8, '2': 9, '3': 10, '4': 3 }
//     console.log(Array.isArray(arguments)) //arguments不是数组类型
//     console.log(Object.prototype.toString.call(arguments)) //[object Arguments]

//     // 使用call/apply将arguments转换为数组, 返回结果为数组，arguments自身不会改变
//     // var arg = [].slice.call(arguments);
//     // for (let (item,index) of arguments) {
//     //     console.log(item,index)
//     // }

//     // console.log(arg);
// }

// exam(2, 8, 9, 10, 3);


// 自执行创建模块
// (function() {
//     // states 结构预览
//     // states = {
//     //     a: 1,
//     //     b: 2,
//     //     m: 30,  
//     //     o: {}
//     // }
//     var states = {}; // 私有变量，用来存储状态与数据

//     // 判断数据类型
//     function type(elem) {
//         if (elem == null) {
//             return elem + '';
//         }
//         return toString.call(elem).replace(/[\[\]]/g, '').split(' ')[1].toLowerCase();
//     }


//     /**
//      * @Param name 属性名
//      * @Description 通过属性名获取保存在states中的值
//      */
//     function get(name) {
//         return states[name] ? states[name] : '';
//     }

//     //获取所有状态和数据
//     function getStates() {
//         return states;
//     }

//     /*
//      * @param options {object} 键值对
//      * @param target {object} 属性值为对象的属性，只在函数实现时递归中传入
//      * @desc 通过传入键值对的方式修改state树，使用方式与小程序的data或者react中的setStates类似
//      */
//     function set(options, target) {
//         var keys = Object.keys(options);
//         var o = target ? target : states;

//         keys.map(function(item) {
//             if (typeof o[item] == 'undefined') {
//                 o[item] = options[item];
//             } else {
//                 type(o[item]) == 'object' ? set(options[item], o[item]) : o[item] = options[item];
//             }
//             return item;
//         })
//     }

//     // 对外提供接口
//     window.get = get;
//     window.set = set;
//     window.getStates = getStates;
// })()

// // 具体使用如下

// set({ a: 20 }); // 保存 属性a
// set({ b: 100 }); // 保存属性b
// set({ c: 10 }); // 保存属性c

// // 保存属性o, 它的值为一个对象
// set({
//     o: {
//         m: 10,
//         n: 20
//     }
// })

// // 修改对象o 的m值
// set({
//     o: {
//         m: 1000
//     }
// })

// // 给对象o中增加一个c属性
// set({
//     o: {
//         c: 100
//     }
// })
// console.log(getStates())

// (function(i) {
//     console.log('hello world', i)
// })(5)

// ! function() {
//     console.log('hello world')
// }


// function getUser(path, callback) {
//     return $.get(path, function(info) {
//         return callback(info);
//     })
// }
//优化
// function getUser(path, callback) {
//     return $.get(path, callback(info))
// }
// getUser('/api/user', function(resp) {
//     // resp为成功请求之后返回的数据
//     console.log(resp);
// })

// enj70k2pf965crbpacu4jcvea9c4rwjq89x36cbeehjngukpan342xaf8d96gp2n9tvqagjn9hmnettpahmmaw1ta9tppmtr85146tbdd5v58cj26xb58w25f9rpgdbucxa6cktf65j34yaj9hcmymkcb596wp1jctvp4x2ndhj7ah9rdx448yk69ctmguak9dq72k23eh76wkut9924gu2a91q30m38c5752t3cb55mmxvgc924rdupdt6naw2d
// enj70k2pf965crbpacu4jcvea9c4rwjq89x36cbeehjngukpan342xaf8d96gp2n9tvqagjn9hmnettpahmmaw1ta9tppmtr85146tbdd5v58cj26xb58w25f9rpgdbucxa6cktf65j34yaj9hcmymkcb596wp1jctvp4x2ndhj7ah9rdx448yk69ctmguak9dq72k23eh76wkut9924gu2a91q30m38c5752t3cb55mmxvgc924rdupdt6naw2d

// const str = 'enj70k2pf965crbpacu4jcvea9c4rwjq89x36cbeehjngukpan342xaf8d96gp2n9tvqagjn9hmnettpahmmaw1ta9tppmtr85146tbdd5v58cj26xb58w25f9rpgdbucxa6cktf65j34yaj9hcmymkcb596wp1jctvp4x2ndhj7ah9rdx448yk69ctmguak9dq72k23eh76wkut9924gu2a91q30m38c5752t3cb55mmxvgc924rdupdt6naw2d'
// console.log(str.length)

// function curriedAdd(x) {
//     return function(y) {
//         return x + y
//     }
// }

// console.log(curriedAdd(1)(3))

// function add(x, y) {

//     return (x + y)

// }

// function currying(fn, ...args1) {
//     return function(...args2) {
//         return fn(...args1, ...args2)
//     }
// }

// let increment = currying(add, 1);
// console.log(increment(2))


// function trueCurrying(fn, ...args) {

//     if (args.length >= fn.length) {

//         return fn(...args)

//     }

//     return function(...args2) {

//         return trueCurrying(fn, ...args, ...args2)

//     }
// }

// let increment = trueCurrying(add, 1)
// console.log(increment(5))

// 简单实现，参数只能从右到左传递
// function createCurry(func, args) {

//     var arity = func.length;
//     var args = args || [];

//     return function() {
//         var _args = [].slice.call(arguments);
//         [].push.apply(_args, args);

//         // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
//         if (_args.length < arity) {
//             return createCurry.call(this, func, _args);
//         }

//         // 参数收集完毕，则执行func
//         return func.apply(this, _args);
//     }
// }

// function check(reg, targetString) {
//     return reg.test(targetString);
// }

// function createCurry(func, args) {
//     var arity = func.length;
//     var args = args || [];

//     return function() {
//         var _args = [].slice.call(arguments);
//         [].unshift.apply(_args, args);
//         console.log(_args)

//         // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
//         if (_args.length < arity) {
//             return createCurry.call(this, func, _args);
//         }

//         // 参数收集完毕，则执行func
//         return func.apply(this, _args);
//     }
// }

// //check 函数柯里化
// let increment = createCurry(check);

// //验证手机号
// let checkPhone = increment(/^1[34578]\d{9}$/);
// console.log(checkPhone('13012257583'))

// //验证邮箱
// let checkEmail = increment(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);
// console.log(checkEmail('ben@email.gmail'));

// function add() {
//     // 第一次执行时，定义一个数组专门用来存储所有的参数
//     var _args = [].slice.call(arguments);

//     // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
//     var adder = function() {
//             var _adder = function() {
//                 // [].push.apply(_args, [].slice.call(arguments));
//                 _args.push(...arguments);
//                 //返回参数数组
//                 return _adder;
//             };

//             // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
//             //重写数组的toString方法
//             _adder.toString = function() {
//                 return _args.reduce(function(a, b) {
//                     return a + b;
//                 });
//             }

//             return _adder;
//         }
//         // return adder.apply(null, _args);
//     return adder(..._args);
// }

// var a = add(1)(2)(3)(4); // f 10
// var b = add(1, 2, 3, 4); // f 10
// var c = add(1, 2)(3, 4); // f 10
// var d = add(1, 2, 3)(4); // f 10

// // 可以利用隐式转换的特性参与计算
// console.log(a + 10); // 20
// console.log(b + 20); // 30
// console.log(c + 30); // 40
// console.log(d + 40); // 50

// // 也可以继续传入参数，得到的结果再次利用隐式转换参与计算
// console.log(a(10) + 100); // 120
// console.log(b(10) + 100); // 120
// console.log(c(10) + 100); // 120
// console.log(d(10) + 100); // 120

// demo02
// console.log('golb1');

// setTimeout(function() {
//     console.log('timeout1');
//     process.nextTick(function() {
//         setTimeout(function() {
//             console.log('test1')
//         })
//         process.nextTick(function() {
//             console.log('test22')
//         })
//         console.log('timeout1_nextTick');
//     })
//     new Promise(function(resolve) {
//         console.log('timeout1_promise');
//         setTimeout(function() {
//             console.log('test2')
//         })
//         resolve();
//     }).then(function() {
//         console.log('timeout1_then')
//         setTimeout(function() {
//             console.log('test3')
//         })
//     })

//     setTimeout(function() {
//         console.log('test4')
//     })
// })

// setImmediate(function() {
//     console.log('immediate1');
//     process.nextTick(function() {
//         console.log('immediate1_nextTick');
//         setTimeout(function() {
//             console.log('test5')
//         })
//     })
//     new Promise(function(resolve) {
//         console.log('immediate1_promise');
//         setTimeout(function() {
//             console.log('test6')
//         })
//         resolve();
//     }).then(function() {
//         console.log('immediate1_then')
//         setTimeout(function() {
//             console.log('test7')
//         })
//     })
//     setTimeout(function() {
//         console.log('test8')
//     })
// })

// process.nextTick(function() {
//     console.log('glob1_nextTick');
//     setTimeout(function() {
//         console.log('test9')
//     })
// })
// new Promise(function(resolve) {
//     console.log('glob1_promise');
//     setTimeout(function() {
//         console.log('test10')
//     })
//     resolve();
// }).then(function() {
//     console.log('glob1_then')
//     setTimeout(function() {
//         console.log('test11')
//     })
// })

// setTimeout(function() {
//     console.log('timeout2');
//     process.nextTick(function() {
//         console.log('timeout2_nextTick');
//         setTimeout(function() {
//             console.log('test12')
//         })
//     })
//     new Promise(function(resolve) {
//         console.log('timeout2_promise');
//         setTimeout(function() {
//             console.log('test13')
//         })
//         resolve();
//     }).then(function() {
//         console.log('timeout2_then')
//         setTimeout(function() {
//             console.log('test14')
//         })
//     })
//     setTimeout(function() {
//         console.log('test15')
//     })
// })

// process.nextTick(function() {
//     console.log('glob2_nextTick');
//     setTimeout(function() {
//         console.log('test16')
//     })
// })
// new Promise(function(resolve) {
//     console.log('glob2_promise');
//     setTimeout(function() {
//         console.log('test17')
//     })
//     resolve();
// }).then(function() {
//     console.log('glob2_then')
//     setTimeout(function() {
//         console.log('test18')
//     })
// })

// setImmediate(function() {
//     console.log('immediate2');
//     process.nextTick(function() {
//         console.log('immediate2_nextTick');
//         setTimeout(function() {
//             console.log('test19')
//         })
//     })
//     new Promise(function(resolve) {
//         console.log('immediate2_promise');
//         setTimeout(function() {
//             console.log('test20')
//         })
//         resolve();
//     }).then(function() {
//         console.log('immediate2_then')
//         setTimeout(function() {
//             console.log('test21')
//         })
//     })

//     setTimeout(function() {
//         console.log('test22')
//     })
// })


//?nextTick队列会比Promie先执行。nextTick中的可执行任务执行完毕之后，才会开始执行Promise队列中的任务

// golb1
// glob1_promise
// glob2_promise //!script 


// glob1_nextTick
// glob1_then
// glob2_nextTick //1 microTask (jobs)
// glob2_then


// timeout1
// timeout1_promise
// immediate1
// immediate1_promise
// timeout2
// timeout2_promise //2. macroTask (Task)
// immediate2
// immediate2_promise

// timeout1_nextTick
// timeout1_then
// immediate1_nextTick //3. microTask (jobs)
// immediate1_then
// timeout2_nextTick
// timeout2_then
// immediate2_nextTick
// immediate2_then


// var promise = new Promise(function(resolve, reject) {
//     resolve("ok");
//     setTimeout(function() { throw new Error('test') }, 0)
//         // throw new Error('wtf')
// });
// promise.then(function(value) { console.log(value) })
//     .catch((err) => {
//         console.log('+++', err)
//     })
// process.on('unhandledRejection', function(err, p) {
//     // console.error('catch exception:', err.stack)
//     console.log('====================')
// });

// const promise = new Promise((resolve, reject) => {
//     // throw new Error('error') //then的第二个参数和catch 都可以捕获,错误捕获就近原则被then的第二个参数捕获
//     // reject('error')//then的第二个参数和catch 都可以捕获，错误捕获就近原则被then的第二个参数捕获
//     resolve('test')
// })

// promise.then(res => {
//     console.log(res)
//     throw new Error('then error') //只能是catch 捕获
// }, error => {
//     console.log('then second param:', error)
// }).catch(error => {
//     console.log('catch:', error)
// })


/**
 * 封装一个自己的 Promise
 */
// class MayJunPromise {
//     constructor(fn) {
//       // {1} 初始化一些默认值
//       this.status = 'pending'; // 一个 promise 有且只有一个状态 (pending | fulfilled | rejected)
//       this.value = undefined; // 一个 JavaScript 合法值（包括 undefined，thenable，promise）
//       this.reason = undefined; // 是一个表明 promise 失败的原因的值
//       this.onResolvedCallbacks = []; // {2}
//       this.onRejectedCallbacks = []; // {3}

//       // {4} 成功回调
//       let resolve = value => {
//         if (this.status === 'pending') {
//           this.status = 'fulfilled'; // 终态
//           this.value = value; // 终值
//           this.onResolvedCallbacks.forEach(itemFn => {
//             itemFn()
//           });
//         }
//       }

//       // {5} 失败回调
//       let reject = reason => {
//         if (this.status === 'pending') { // 状态不可逆，例如 resolve(1);reject('err'); 第二个 reject 就无法覆盖
//           this.status = 'rejected'; // 终态
//           this.reason = reason; // 终值
//           this.onRejectedCallbacks.forEach(itemFn => itemFn());
//         }
//       }

//       try {
//         // {6} 自执行
//         fn(resolve, reject);
//       } catch(err) {
//         reject(err); // {7} 失败时捕获
//       }
//     }
//   }