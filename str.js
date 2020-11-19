let camelizeRE = /-(\w)/g;

let str = 'a-Ab'
console.log(str.replace(camelizeRE, function(a, c, b, f) {
    console.log(a, c, b, f)
    return c ? c.toUpperCase() : '';
}))