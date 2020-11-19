// console.log(new Map([
//     ['a', 1],
//     ['b', 2]
// ]))

// const array = [1, [1, [1, 2, 3, [4, 3]]]];
// //扁平
// const tmp_arr1 = array.flat(3)
//     //去重
// const tmp_arr2 = new Set(tmp_arr1);
// //生成数组
// const tmp_arr3 = [...tmp_arr2]
// const tmp_arr4 = Array.from(tmp_arr2)
// console.log(tmp_arr3)
// console.log(tmp_arr4)


// function objToMap(obj) {
//     const map = new Map();
//     for (let key of Object.keys(obj)) {
//         map.set(key, obj[key])
//     };
//     return map
// }

// function jsonToStrMap(jsonStr) {
//     return objToMap(JSON.parse(jsonStr));
// }



// console.log(jsonToStrMap('{"name": "An", "des": "JS"}'))