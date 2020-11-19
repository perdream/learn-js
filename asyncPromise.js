        /* 
         * 同步JPromise的功能添加异步执行功能
         */

        /* 
         * 定义状态常量
         */
        const PENDING = 1;
        const FULFILLED = 2;
        const REJECTING = 3;

        class JPromise {
            constructor(excutor) {
                const me = this;
                me.status = PENDING;
                me.value = null;
                me.error = null;
                me.resolveCallback = []; //以数组存储多个then成功的回调函数
                me.rejectCallback = []; //以数组存储多个then失败的的回调函数

                function resolve(val) {
                    if (me.status === PENDING) { //检查状态，不可逆操作
                        me.status = FULFILLED;
                        me.value = val;
                        me.resolveCallback.forEach(func => func(val)); //状态改变为fulfilled并执行resolve
                    }
                }

                function reject(val) {
                    if (me.status === PENDING) { //检查状态，不可逆操作
                        me.status = REJECTING;
                        me.error = val;
                        me.rejectCallback.forEach(func => func(val)); //状态改变为rejecting并执行reject
                    }
                }

                try {
                    excutor(resolve, reject);
                } catch (error) {
                    reject(error);
                }
            }

            then(onResolve, onReject) {
                const me = this;
                onResolve = typeof onResolve === 'function' ?
                    onResolve :
                    v => v;
                onReject = typeof onReject === 'function' ?
                    onReject :
                    e => {
                        throw e;
                    }
                if (me.status === PENDING) {
                    me.resolveCallback.push(onResolve); //保存成功回调
                    me.rejectCallback.push(onReject); //保存失败回调
                } else if (me.status === FULFILLED) {
                    setTimeout(() => { //macroTask
                        try {
                            onResolve(me.value);
                        } catch (error) {
                            onReject(error);
                        }
                    });

                } else if (me.status === REJECTING) {
                    setTimeout(() => { //macroTask
                        try {
                            onReject(me.error);
                        } catch (error) {
                            onReject(error);
                        }
                    });
                }
            }

        }

        // new JPromise((resolve, reject) => {
        //     console.log('before resolve');
        //     setTimeout(() => { //macroTask
        //         resolve('resolved');
        //     }, 5000);
        //     console.log('after resolve');
        // }).then(res => {
        //     console.log(res);
        // });

        //    //运行结果：

        //    //before resolve
        //    //after resolve
        //    //resolved (延迟1秒后运行)

        // var p = new JPromise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve('delay 2000s');
        //         p.then(res => {
        //             console.log(`run after resolve,res is:  ${res}`);
        //         });
        //     }, 2000);
        // });

        // p.then(res => { //回调同时加入microTask和promise 的 resolveCallback
        //     console.log(res);
        // });
        // p.then(res => { //回调同时加入microTask和promise 的 resolveCallback
        //     console.log(`${res} run again`);
        // });

        //    //运行结果:

        //    //2秒后：
        //    //delay 2000s
        //    //delay 2000s run again
        //    //run after resolve,res is:  delay 2000s

        var p1 = new JPromise((resolve, reject) => {
            setTimeout(() => {
                reject('reject test');
            }, 3000);
        });

        p1.then(null, res => {
            console.log(res);
        });