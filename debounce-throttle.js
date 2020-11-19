/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行
 * @param idle   {number}    空闲时间，单位毫秒
 * @param action {function}  请求关联函数，实际应用需要调用的函数
 * @return {function}    返回客户调用函数
 */
let debounce = function(idle, action) {
    let last;
    return function() {
        let ctx = this,
            args = arguments;
        clearTimeout(last);
        last = setTimeout(function() {
            action.apply(ctx, args);
        }, idle);
    };
};

// console.log(debounce(100, () => {
//     console.log('执行')
// }));

//防抖处理后的函数
const fn = debounce(5000, function() {
    console.log(arguments)
})

fn(1, 2, 4)
fn(1, 2, 5)
fn(1, 2, 6)
fn(1, 2, 7)



/**
 * 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
 * @param delay  {number}    延迟时间，单位毫秒
 * @param action {function}  请求关联函数，实际应用需要调用的函数
 * @return {function}    返回客户调用函数
 */

let throttle = function(delay, action) {
    let last = 0;
    return function() {
        let curr = +new Date();
        if (curr - last > delay) {
            action.apply(this, arguments);
            last = curr;
        }
    };
};

//节流处理后的函数
const fn2 = throttle(1000, function() {
    console.log([].slice.call(arguments))
});

fn2(1, 2, 666);
// const time = new Date()
// console.log(Object.prototype.toString.call(time), +time)