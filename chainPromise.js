        /* 
         * 进阶功能：增加链式操作,all和执行
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
                me.resolveCallback = []; //以数组存储多个then的回调函数
                me.rejectCallback = []; //以数组存储多个then的回调函数

                function resolve(val) {
                    if (val instanceof JPromise) { //resolve返回promise对象
                        return val.then(resolve, reject);
                    }
                    if (me.status === PENDING) { //检查状态，不可逆操作
                        me.status = FULFILLED;
                        me.value = val;
                        me.resolveCallback.forEach(func => func(val)); //状态改变为fulfilled并执行resolve
                    }
                }

                function reject(val) {
                    if (val instanceof JPromise) {
                        return val.then(resolve, reject);
                    }
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

            /* 
             * 链式操作不是返回this，而是返回一个新的promise实例
             */
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
                    return new JPromise((resolve, reject) => { //返回新的实例
                        me.resolveCallback.push(() => {
                            try {
                                resolvePromise(onResolve(me.value), resolve, reject);
                            } catch (error) {
                                reject(error);
                            }
                        });
                        me.rejectCallback.push(() => {
                            try {
                                resolvePromise(onReject(me.error), resolve, reject);
                            } catch (error) {
                                reject(error);
                            }
                        });
                    });
                } else if (me.status === FULFILLED) {
                    return new JPromise((resolve, reject) => { //返回新的实例
                        setTimeout(() => {
                            try {
                                resolvePromise(onResolve(me.value), resolve, reject);
                            } catch (error) {
                                reject(error);
                            }
                        });
                    });
                } else if (me.status === REJECTING) {
                    return new JPromise((resolve, reject) => { //返回新的实例
                        setTimeout(() => {
                            try {
                                onReject(me.error);
                            } catch (error) {
                                reject(error);
                            }
                        });
                    });
                }
            }

            /* 
             * 捕获promise抛出错误或者reject状态改变返回值
             */
            catch (onReject) {
                return this.then(null, onReject);
            }

            /* 
             * 总是最后执行
             */
            finally(callback) {
                return this.then(callback, callback);
            }
        }

        function resolvePromise(retValue, resolve, reject) {
            if (retValue instanceof JPromise) {
                if (retValue.status === PENDING) {
                    retValue.then(ret => {
                        resolvePromise(ret, resolve, reject);
                    }, error => {
                        reject(error);
                    });
                } else {
                    retValue.then(resolve, reject);
                }
            } else {
                resolve(retValue);
            }
        }


        // var p2 = new JPromise((resolve, reject) => {
        //     reject(1); //被then 的第二个参数捕获到
        // }).then(res => {
        //     console.log(res);
        //     throw new Error('then error');
        // }, err => {
        //     console.log('then catch error', err);
        //     throw new Error('inner error2');
        // }).catch(err => {
        //     console.log('catch error', err); //捕获到then 第二个参数抛出的error
        // });

        var p3 = new JPromise((resolve, reject) => {
            setTimeout(() => {
                reject(1);
            }, 1000);
        }).catch(err => {
            console.log(err);
            return new JPromise((rs, rj) => {
                setTimeout(() => {
                    rs(2);
                }, 1000);
            });
        }).then(res => {
            console.log(res);
            return 'foo';
        }).finally(s => {
            console.log(s);
            console.log('finally run');
        });