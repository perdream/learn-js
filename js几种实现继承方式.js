/**
 * 声明一个父类
 * @param {string} name 
 */
function People(name) {
    //属性
    this.name = name || 'Annie'
        //实例方法
    this.sleep = function() {
        console.log(this.name + '正在睡觉')
    }
}
//原型方法
People.prototype.eat = function(food) {
    console.log(this.name + '正在吃：' + food);
}


/**
 * 原型继承
 * 优点：
 *  容易实现
 * 
 * 缺点：
 *  无法调用父类构造函数时候传参
 *  无法实现多继承
 */
function Wuman() {

}
Wuman.prototype = new People()
Wuman.prototype.name = 'ben'
Wuman.prototype.eat()



/**
 * 构造函数继承
 * 优点：
 *  可以实现多继承
 *  可以在调用父类构造函数时传参
 * 
 * 缺点:
 *  不能调用父类原型上的方法和属性
 *
 */

function Wuman2(name) {
    People.call(this, name)
}
const wuman2 = new Wuman2('ben')
console.log(wuman2.name);
// wuman2.eat() //TypeError : wuman2.eat is not a function



/**
 * 组合继承
 * 缺点：
 *  产生两个实例
 */
function Wuman3(name) {
    People.call(this, name)
}
Wuman3.prototype = new People()
Wuman3.prototype.constructor = Wuman3
let wonmanObj = new Wuman3('ren');
console.log(wonmanObj.name)
wonmanObj.eat()


/**
 * 寄生组合继承(很完美)
 */
//子类
function Woman4(name) {
    //继承父类属性
    People.call(this, name)
}
//继承父类方法
(function() {
    // 创建空类
    let Super = function() {};
    Super.prototype = People.prototype;
    //父类的实例作为子类的原型
    Woman4.prototype = new Super();
})();
//修复构造函数指向问题
Woman4.prototype.constructor = Woman4;
let womanObj = new Woman4();



/**
 * es6 class 实现继承
 */
//class 相当于es5中构造函数
//class中定义方法时，前后不能加function，全部定义在class的protopyte属性中
//class中定义的所有方法是不可枚举的
//class中只能定义方法，不能定义对象，变量等
//class和方法内默认都是严格模式
//es5中constructor为隐式属性
class People2 {
    constructor(name = 'wang', age = '27') {
        this.name = name;
        this.age = age;
    }
    eat() {
        console.log(`${this.name} ${this.age} eat food`)
    }
}
//继承父类
class Woman5 extends People2 {
    constructor(name = 'ren', age = '27') {
        //继承父类属性
        super(name, age);
    };
    //重载父类的方法
    eat() {
        //继承父类方法
        super.eat()
    }
}
let wonmanObj2 = new Woman5('xiaoxiami');
wonmanObj2.eat();