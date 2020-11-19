//赋值是赋值对象的引用，浅拷贝是生成新对象，复制对象的属性

//数组的concat 和 slice 不会修改原数组而是浅拷贝生成新的数组返回

let arr = [
    1,
    2,
    {
        username: "kobe"
    }
];
let arr2 = arr.concat();
arr2[2].username = "wade";
arr2[1] = 1
console.log(arr);


//JSON.parse、JSON.stringify 做深拷贝的局限
/**
 * 1.不能拷贝function，正则， Symbol
 * 2.对象的循环引用报错
 * 3.相同引用会被重复赋值
 * 
 */
let obj = { asd: "asd" };
let obj2 = { name: "aaaaa" };
obj.ttt1 = obj2;
obj.ttt2 = obj2;
let cp = JSON.parse(JSON.stringify(obj));
obj.ttt1.name = "change";
cp.ttt1.name = "change";
console.log(obj);
console.log(cp);


// reference
// let foo = 1;

// let fooReference = {
//     base: EnvironmentRecord,
//     name: "foo",
//     strict: false
// };

// GetValue(fooReference); // 1;