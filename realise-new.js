//模拟实现new
function objectFactory() {
    let obj = new Object();
    //剔除arguments参数组成的类数组中的第一个参数并返回（第一个参数为方法的构造函数）
    let Constructor = [].shift.call(arguments);

    //将新建对象的_proto_指向Constructor的原型对象 （新对象由此可以根据原型链使用原型对象的属性和方法）
    obj.__proto__ = Constructor.prototype;

    //调用构造函数并返回
    let ret = Constructor.apply(obj, arguments);

    //如果返回值是一个对象就返回该对象，否则返回构造函数的一个实例对象
    return typeof ret === "object" ? ret : obj;
}

const newObj = objectFactory()