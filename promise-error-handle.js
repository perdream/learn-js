// 错误处理
// Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被 onReject 函数处理或 catch 语句捕获为止。具备了这样“冒泡”的特性后，就不需要在每个 Promise 对象中单独捕获异常了。
// 要遇到一个then，要执行成功或者失败的方法，但如果此方法并没有在当前then中被定义，则顺延到下一个对应的函数

//例子1
// function executor(resolve, reject) {
//     let rand = Math.random()
//     console.log(1)
//     console.log(rand)
//     if (rand > 0.5) {
//         resolve()
//     } else {
//         reject()
//     }
// }
// var p0 = new Promise(executor)
// var p1 = p0.then((value) => {
//     console.log('succeed-1')
//     return new Promise(executor)
// })
// var p2 = p1.then((value) => {
//     console.log('succeed-2')
//     return new Promise(executor)
// })
// var p3 = p2.then((value) => {
//     console.log('succeed-3')
//     return new Promise(executor)
// })
// p3.catch((error) => {
//     console.log('error', error)
// })
// console.log(2)



//例子2
// let p1 = new Promise((resolve, reject) => {
//         resolve(100) // 决定了下个then中成功方法会被执行
//     })
//     // 连接p1
// let p2 = p1.then(result => {
//         console.log('成功1 ' + result)
//         return Promise.reject(1)
//             // 返回一个新的Promise实例，决定了当前实例是失败的，所以决定下一个then中失败方法会被执行
//     }, reason => {
//         console.log('失败1 ' + reason)
//         return 200
//     })
//     // 连接p2 
// let p3 = p2.then(result => {
//         console.log('成功2 ' + result)
//     }, reason => {
//         console.log('失败2 ' + reason)
//     })
//     // 成功1 100
//     // 失败2 1



//例子3
new Promise(resolve => {
        resolve(a) // 报错 
            // 这个executor函数执行发生异常错误，决定下个then失败方法会被执行
    }).then(result => {
        console.log(`成功：${result}`)
        return result * 10
    }, reason => {
        console.log(`失败：${reason}`)
            // 执行这句时候，没有发生异常或者返回一个失败的Promise实例，所以下个then成功方法会被执行
            // 这里没有return，最后会返回 undefined
            //相当于于return Promise.resolve(undefined)
    }).then(result => {
        console.log(`成功：${result}`)
    }, reason => {
        console.log(`失败：${reason}`)
    })
    // 失败：ReferenceError: a is not defined
    // 成功：undefined