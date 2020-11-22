'use strict';

const copyProperty = (to, from, property, ignoreNonConfigurable) => {
	// `Function#length` should reflect the parameters of `to` not `from` since we keep its body.
	// `Function#prototype` is non-writable and non-configurable so can never be modified.
	if (property === 'length' || property === 'prototype') {
		return;
	}

	// `Function#arguments` and `Function#caller` should not be copied. They were reported to be present in `Reflect.ownKeys` for some devices in React Native (#41), so we explicitly ignore them here.
	if (property === 'arguments' || property === 'caller') {
		return;
	}

	const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
	const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);

	if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
		return;
	}

	Object.defineProperty(to, property, fromDescriptor);
};

// `Object.defineProperty()` throws if the property exists, is not configurable and either:
//  - one its descriptors is changed
//  - it is non-writable and its value is changed
const canCopyProperty = function (toDescriptor, fromDescriptor) {
	return toDescriptor === undefined || toDescriptor.configurable || (
		toDescriptor.writable === fromDescriptor.writable &&
		toDescriptor.enumerable === fromDescriptor.enumerable &&
		toDescriptor.configurable === fromDescriptor.configurable &&
		(toDescriptor.writable || toDescriptor.value === fromDescriptor.value)
	);
};

const changePrototype = (to, from) => {
	const fromPrototype = Object.getPrototypeOf(from);
	if (fromPrototype === Object.getPrototypeOf(to)) {
		return;
	}

	Object.setPrototypeOf(to, fromPrototype);
};

const wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/\n${fromBody}`;

const toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, 'toString');
const toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, 'name');

// We call `from.toString()` early (not lazily) to ensure `from` can be garbage collected.
// We use `bind()` instead of a closure for the same reason.
// Calling `from.toString()` early also allows caching it in case `to.toString()` is called several times.
const changeToString = (to, from, name) => {
	const withName = name === '' ? '' : `with ${name.trim()}() `;
	const newToString = wrappedToString.bind(null, withName, from.toString());
    // Ensure `to.toString.toString` is non-enumerable and has the same `same`
    
    //数据描述符（data descriptor）：可设置 configurable | enumerable |value | writable。
    // 存储描述符（access descriptor）：可设置 configurable | enumerable | get | set。
    //不能同时set、writable 或 value、get
	Object.defineProperty(newToString, 'name', toStringName);
	Object.defineProperty(to, 'toString', {...toStringDescriptor, value: newToString});
};

const mimicFn = (to, from, {ignoreNonConfigurable = false} = {}) => {
	const {name} = to;
    /**
     * Reflect.ownKeys() 相当于 Object.getOwnPropertyNames().concat(Object.getOwnPropertySymbols()) 
     * 
     * 注：对象的Symbol类型的属性只能通过Object.getOwnPropertySymbols() 获取
     */
	for (const property of Reflect.ownKeys(from)) {
        //在javascript 中一切皆是对象，所以函数也有自己的属性描述符
        /**
         * 
         * function foo(x) { 
    console.log('foo..'); 
}

console.log(Object.getOwnPropertyDescriptors(foo));

{ 
   length:  //函数参数个数
   { value: 1,
     writable: false,
     enumerable: false,
     configurable: true },
  name: //函数名 不可直接赋值改变
   { value: 'foo',
     writable: false,
     enumerable: false,
     configurable: true },
  arguments: //函数实参个数
   { value: null,
     writable: false,
     enumerable: false,
     configurable: false },
  caller: //指向函数的调用者
   { value: null,
     writable: false,
     enumerable: false,
     configurable: false },
  prototype: //指向函数的原型对象
   { value: foo {},
     writable: true,
     enumerable: false,
     configurable: false }
}


Object.defineProperty(obj, prop, descriptor)：当属性的 configurable 为 true 时，可以对已有的属性的描述符进行变更。
Object.preventExtensions(obj)：阻止 obj 被添加新的属性。
Object.seal(obj)：阻止 obj 被添加新的属性或者删除已有的属性。
Object.freeze(obj)：阻止 obj 被添加新的属性、删除已有的属性或者更新已有的属性。


         */
		copyProperty(to, from, property, ignoreNonConfigurable);
	}

	changePrototype(to, from);
	changeToString(to, from, name);

	return to;
};

module.exports = mimicFn;