// 原型对象
var A = {
    print: function() {},
    name: {
        a: 2
    }
};

// 实例对象(属性的拷贝,类型于函数传参)
var B = Object.create(A);
B.print(); // hello
B.print === A.print; // true
B.name.a = 3;
console.log(A.name)
B.name = 5
const ownProps = Object.getOwnPropertyNames(B)
console.log(ownProps);
// const allProps = Object.getPrototypeOf(B)
// console.log(allProps)
for (let i in B) {
    console.log(B[i])
}