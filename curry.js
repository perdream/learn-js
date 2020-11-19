// function currying(fn) {
//     let slice = Array.prototype.slice,
//         __args = slice.call(arguments, 1);
//     return function() {
//         let __inargs = slice.call(arguments);
//         return fn.apply(null, __args.concat(__inargs));
//     };
// }


// function square(i) {
//     return Math.pow(i, 2);
// }

// function dubble(i) {
//     return i *= 2;
// }

// function map(handeler, list) {
//     console.log(arguments)
//     return list.map(handeler);
// }

// const tmp_fun = currying(map, square)
// console.log(tmp_fun([1, 2, 3, 4, 5]))
// const tmp_fun2 = currying(map, dubble)
// console.log(tmp_fun2([1, 2, 3, 4, 5]))
//     // console.log(tmp_fun)




// function Ajax() {
//     this.xhr = new XMLHttpRequest();
// }

// Ajax.prototype.open = function(type, url, data, callback) {
//     this.onload = function() {
//         callback(this.xhr.responseText, this.xhr.status, this.xhr);
//     };

//     this.xhr.open(type, url, data.async);
//     this.xhr.send(data.paras);
// };

// "get post".split(" ").forEach(function(mt) {
//     Ajax.prototype[mt] = currying(Ajax.prototype.open, mt);
// });

// let xhr = new Ajax();
// xhr.get("/articles/list.php", {}, function(datas) {
//     // done(datas)
// });

// let xhr1 = new Ajax();
// xhr1.post("/articles/add.php", {}, function(datas) {
//     // done(datas)
// });




// let add = function() {
//     let _this = this,
//         _args = arguments
//     return function() {
//         if (!arguments.length) {
//             let sum = 0;
//             for (let i = 0, c; c = _args[i++];) {
//                 sum += c;
//             }
//             return sum
//         } else {
//             Array.prototype.push.apply(_args, arguments) return arguments.callee
//         }
//     }
// }
// add(1)(2)(3)(4)(); //10



let curry = function(fn) {
    let _args = [];
    return function cb() {
        if (arguments.length == 0) {
            return fn.apply(this, _args);
        }
        Array.prototype.push.apply(_args, arguments);
        return cb;
    };
};

let add = function() {
    let args = [].slice.call(arguments),
        sum = 0;
    let i = 0
    while (i < args.length) {
        sum += args[i]
        i++
    }
    return sum
}

const afterCurryFun = curry(add)
console.log(afterCurryFun(1)(2)())


//柯里化的典型应用bind
Function.prototype.bind = function(context) {
    //保存调用函数和调用函数的参数
    let _this = this,
        args = [].slice.call(arguments);
    //bind返回一个函数，返回被调用函数的返回值
    return function() {
        return _this.apply(context, args.concat(Array.prototype.slice.call(arguments)))
    }

}