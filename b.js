// console.log('b 开始');
// exports.done = false;
// const a = require('./a.js');
// console.log('在 b 中，a.done = %j', a.done);
// exports.done = true;
// console.log('b 结束');

function filterEmoji(text) {
    const ranges = [
        '\ud83c[\udf00-\udfff]',
        '\ud83d[\udc00-\ude4f]',
        '\ud83d[\ude80-\udeff]'
    ];
    return text.replace(new RegExp(ranges.join('|'), 'g'), '');
}

const str = '香🌶🐔翅'

console.log(filterEmoji(str))