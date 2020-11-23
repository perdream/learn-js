'use strict';

const processFn = (fn, options, proxy, unwrapped) => function(...arguments_) {
    //获取Promise 模块构造函数
    const P = options.promiseModule;

    return new P((resolve, reject) => {
        if (options.multiArgs) {
            arguments_.push((...result) => {
                if (options.errorFirst) {
                    if (result[0]) {
                        reject(result);
                    } else {
                        result.shift();
                        resolve(result);
                    }
                } else {
                    resolve(result);
                }
            });
        } else if (options.errorFirst) {
            arguments_.push((error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        } else {
            arguments_.push(resolve);
        }

        const self = this === proxy ? unwrapped : this;
        Reflect.apply(fn, self, arguments_);
    });
};

const filterCache = new WeakMap();

module.exports = (input, options) => {
    options = {
        exclude: [/.+(?:Sync|Stream)$/],
        errorFirst: true,
        promiseModule: Promise,
        ...options
    };

    const objectType = typeof input;
    //未传递参数和参数不是一个对象或者函数类型则抛出错误
    if (!(input !== null && (objectType === 'object' || objectType === 'function'))) {
        throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? 'null' : objectType}\``);
    }

    const filter = (target, key) => {
        let cached = filterCache.get(target);

        if (!cached) {
            cached = {};
            filterCache.set(target, cached);
        }

        if (key in cached) {
            return cached[key];
        }

        const match = pattern => (typeof pattern === 'string' || typeof key === 'symbol') ? key === pattern : pattern.test(key);
        const desc = Reflect.getOwnPropertyDescriptor(target, key);
        const writableOrConfigurableOwn = (desc === undefined || desc.writable || desc.configurable);

        const included = options.include ? options.include.some(match) : !options.exclude.some(match);
        const shouldFilter = included && writableOrConfigurableOwn;
        cached[key] = shouldFilter;
        return shouldFilter;
    };

    const cache = new WeakMap();

    //Proxy 拦截对象默认行为
    const proxy = new Proxy(input, {
        //代理apply 行为，每当执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截。
        apply(target, thisArg, args) {

            //缓存中存在该函数或者对象promisify 后的值（processFn方法返回的promise实例），则直接调，避免重复
            const cached = cache.get(target);

            if (cached) {
                return Reflect.apply(cached, thisArg, args);
            }

            const pified = options.excludeMain ? target : processFn(target, options, proxy, target);
            cache.set(target, pified);
            return Reflect.apply(pified, thisArg, args);
        },

        //代理get行为
        get(target, key) {
            const property = target[key];

            // eslint-disable-next-line no-use-extend-native/no-use-extend-native
            if (!filter(target, key) || property === Function.prototype[key]) {
                return property;
            }

            const cached = cache.get(property);

            if (cached) {
                return cached;
            }

            if (typeof property === 'function') {
                const pified = processFn(property, options, proxy, target);
                cache.set(property, pified);
                return pified;
            }

            return property;
        }
    });

    return proxy;
};