let arr = [1, 2, 3]
    // console.log(arr.toString())

//实现call
Function.prototype.call2 = function(context) {
    //如果context 为空 则默认指向window
    context = context || window

    //获取调用函数
    context.fn = this

    //获取参数
    console.log(arguments.length)


    //执行函数(输出所有参数)
    let i = arguments.length - 1
    while (i > 0) {
        context.fn(arguments[i])
        i--
    }

    //删除centext中的fn函数
    delete context.fn
}

let foo = {
    value: 2
}

let b = function() {
    console.log(this.value)
}

b.call2(foo, ...arr)