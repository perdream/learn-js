//如果 await 右侧表达逻辑是个 promise，await会等待这个promise的返回结果，只有返回的状态是resolved情况，
// 才会把结果返回,如果promise是失败状态，则await不会接收其返回结果，await下面的代码也不会在继续执行。

console.log(1)
setTimeout(() => { console.log(2) }, 1000)
async function fn() {
    console.log(3)
    setTimeout(() => { console.log(4) }, 20)
    return Promise.reject()
}
async function run() {
    console.log(5)
    try {
        await fn()
    } catch (error) {
        console.log(error)
    }
    console.log(6)
}
run()
    //需要执行150ms左右
for (let i = 0; i < 90000000; i++) {}
setTimeout(() => {
    console.log(7)
    new Promise(resolve => {
        console.log(8)
        resolve()
    }).then(() => { console.log(9) })
}, 0)
console.log(10)

// 1 5 3 10 6 4 7 8 9 2