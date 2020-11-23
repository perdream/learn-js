/*!
 * ee-first
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */

/**
 * var thunk = first([
  [ee1, 'close', 'end', 'error'],
  [ee2, 'error']
], function (err, ee, event, args) {
  // listener invoked
})

// cancel and clean up
thunk.cancel()
 * 
 */



'use strict'

/**
 * Module exports.
 * @public
 */

module.exports = first

/**
 * Get the first event in a set of event emitters and event pairs.
 *
 * @param {array} stuff
 * @param {function} done
 * @public
 */

function first(stuff, done) {
    if (!Array.isArray(stuff)) {
        throw new TypeError('arg must be an array of [ee, events...] arrays')
    }

    var cleanups = []

    for (var i = 0; i < stuff.length; i++) {
        var arr = stuff[i]

        if (!Array.isArray(arr) || arr.length < 2) {
            throw new TypeError('each array member must be [ee, events...]')
        }

        var ee = arr[0] //获取EventEmitter对象

        for (var j = 1; j < arr.length; j++) {
            var event = arr[j]
            var fn = listener(event, callback)

            // listen to the event
            ee.on(event, fn)
                // push this listener to the list of cleanups
                //加入cleanups 数组，方便清除事件监听
            cleanups.push({
                ee: ee,
                event: event,
                fn: fn
            })
        }
    }

    function callback() {
        //当一个事件来临被监听且执行之前，删除所有事件监听后再执行
        cleanup()
            //arguments = [err, ee, event, args]
        done.apply(null, arguments)
    }

    function cleanup() {
        var x
        for (var i = 0; i < cleanups.length; i++) {
            x = cleanups[i]
            x.ee.removeListener(x.event, x.fn)
        }
    }
    //在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数
    //任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式
    function thunk(fn) {
        //可以通过thunk 传入fn更改事件监听的回调处理函数
        done = fn
    }

    thunk.cancel = cleanup

    return thunk
}

/**
 * Create the event listener.
 * @private
 */

function listener(event, done) {
    return function onevent(arg1) {
        var args = new Array(arguments.length)
        var ee = this

        //如果监听的是错误事件，则回调函数的参数就是错误的数据
        var err = event === 'error' ?
            arg1 :
            null

        // copy args to prevent arguments escaping scope
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i]
        }

        done(err, ee, event, args)
    }
}