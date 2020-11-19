// var a = [];
// a[0] = 'Bale';
// a['age'] = 28;
// console.log(a.length); //1
// console.log(a['age']); //28
// console.log(a); //[ 'Bale', age: 28 ]
// for (let item of a) {
//     console.log(item)
// }




//判断（{}）+ 1  类型转换原理
// ECMA-262, section 9.1, page 30. Use null/undefined for no hint,
// (1) for number hint, and (2) for string hint.
function ToPrimitive(x, hint) {
    // Fast case check.
    if (IS_STRING(x)) return x;
    // Normal behavior.
    if (!IS_SPEC_OBJECT(x)) return x;
    if (IS_SYMBOL_WRAPPER(x)) throw MakeTypeError(kSymbolToPrimitive);
    if (hint == NO_HINT) hint = (IS_DATE(x)) ? STRING_HINT : NUMBER_HINT;
    return (hint == NUMBER_HINT) ? DefaultNumber(x) : DefaultString(x);
}

// ECMA-262, section 8.6.2.6, page 28.
function DefaultNumber(x) {
    if (!IS_SYMBOL_WRAPPER(x)) {
        var valueOf = x.valueOf;
        if (IS_SPEC_FUNCTION(valueOf)) {
            var v = % _CallFunction(x, valueOf);
            if (IsPrimitive(v)) return v;
        }

        var toString = x.toString;
        if (IS_SPEC_FUNCTION(toString)) {
            var s = % _CallFunction(x, toString);
            if (IsPrimitive(s)) return s;
        }
    }
    throw MakeTypeError(kCannotConvertToPrimitive);
}

// ECMA-262, section 8.6.2.6, page 28.
function DefaultString(x) {
    if (!IS_SYMBOL_WRAPPER(x)) {
        var toString = x.toString;
        if (IS_SPEC_FUNCTION(toString)) {
            var s = % _CallFunction(x, toString);
            if (IsPrimitive(s)) return s;
        }

        var valueOf = x.valueOf;
        if (IS_SPEC_FUNCTION(valueOf)) {
            var v = % _CallFunction(x, valueOf);
            if (IsPrimitive(v)) return v;
        }
    }
    throw MakeTypeError(kCannotConvertToPrimitive);
}



//执行环境 JavaScript 代码是先解释后执行，解释时期就会产生执行环境（可用于解释变量声明提升）
// executionContextObj = {
//     'scopeChain': { /* 变量对象 + 所有父级执行上下文中的变量对象 */ },
//     'variableObject': { /*  函数参数 / 参数, 内部变量以及函数声明 */ },
//     'this': {}
// }

//let和const 是存在变量声明提升的，只不过let和const  的「创建」过程被提升了，但是初始化没有提升。

//作用域链与一个执行上下文相关，是内部上下文所有变量对象（包括父变量对象）的列表，用于变量查询

//原型链:
//总而言之,实例对象方法调用,是现在实力对象内部找,如果找到则立即返回调用,如果没有找到就顺着__proto__向上寻找,如果找到该方法则调用,没有找到会直接报错,这便是原型链.
function person(pname, page) {
    this.name = pname;
    this.age = page;
}
person.prototype.profession = "football player";
var person1 = new person("Messi", 29);
var person2 = new person("Bale", 28);

Object.setPrototypeOf(person1, { League: "La Liga" }); //覆盖原型对象 person1._proto_ = {League: "La Liga"},所以person1 和person2 的原型对象不同了

console.log(person1.League); //La Liga
console.log(person2.League); //undefind


//this:this一共存在4种绑定规则： new绑定 > 显式绑定 >隐式绑定 >默认绑定
//1.默认绑定：
// name = "Bale";
// function sayName () {
//     console.log(this.name);
// };
// sayName(); //"Bale"
// 以上代码可以看成我们第一节例子中的f函数,它之所以指向window对象,就是运用了this默认绑定的规则,因为此实例代码中既没有运用apply 　bind等显示绑定,也没有用new绑定,不适用于其他绑定规则,因此便是默认绑定,此时的this指向全局变量,即浏览器端的windowNode.js中的global.

//2.隐式绑定:当函数被调用的位置存在上下文对象,或者说被某个对象拥有或包含,这时候函数的f的this被隐式绑定到obj对象上.
function f() {
    console.log(this.name);
}
var obj = {
    name: "Messi",
    f: f
};
obj.f(); // Messi

//3.显式绑定:call、apply、bind
//bind 并返回一个函数，并可以预传参数，
function addArguments(arg1, arg2) {
    return arg1 + arg2
}
var addThirtySeven = addArguments.bind(null, 37);
// 37 + 5 = 42 


//4.new绑定:用 new 调用一个构造函数，会创建一个新对象, 在创造这个新对象的过程中,新对象会自动绑定到Person对象的this上，那么 this 自然就指向这个新对象。 这没有什么悬念，因为 new 本身就是设计来创建新对象的。
function Person(name) {
    this.name = name;
    console.log(name);
}
var person1 = new Person('Messi'); //Messi


//ES6箭头函数中的this:没有属于自己的this,箭头函数是不会被new调用的.
// ES6
const obj = {
        getArrow() {
            return () => {
                console.log(this === obj);
            };
        }
    }
    // ES5，由 Babel 转译
var obj = {
    getArrow: function getArrow() {
        var _this = this;
        return function() {
            console.log(_this === obj);
        };
    }
};


//JavaScript面向对象之属性 :内置对象(Array, Error, Date等), 宿主对象(对于前端来说指的是浏览器对象,例如window), 自定义对象(指我们自己创建的对象)
//添加属性调用内部的[[put]]方法,修改属性调用[[set]]方法，正确删除对象属性的方法是delete 而不是将属性设置为null，因为此时保存属性的节点依然存在
var person = {
    name: "Messi",
    age: 29
};

for (var pros in person) {
    console.log(pros); // name age 
}

var pros = Object.keys(person);
console.log(pros); //[ 'name', 'age' ]
// 值得注意的是,并非所有的属性都是可枚举的,例如对象自带的属性length等等,因此我们可以用propertyIsEnumerable()方法来判断一个属性是否可枚举.
//Object.keys() 方法会返回一个由给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for…in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。返回值是这个对象的所有可枚举属性组成的字符串数组。



//JavaScript是按引用传递吗?
//基本（原始）数据类型是值传递，引用（对象）数据类型是传递引用，或者叫共享传递


//!如何实现一个深克隆


//实现双向绑定Proxy比defineproperty优劣如何?
//Vue2 通过Object.defineProperty()做数据劫持，从而实现双向绑定 （Vue运用了数据劫持，但是依然离不开发布订阅的模式）