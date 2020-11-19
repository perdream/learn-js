let koa = require('koa');
//一个工具类
let util = require('util');
let route = require('koa-route');
let request = require('request');
//这个用于作为用户id
let globalUserId = 1;
let app = koa()

//用于判断服务是否启动
app.use(route.get('/', function*() {
        this.body = 'Hello world';
    }))
    //定义请求到后端的URL地址，这里为了方便我就在本机上测试，大家如果有远程服务器的话可以在远程服务器上测试
let uri = 'http://127.0.0.1:8000/buy?userid=%d';
let timeout = 30 * 1000; //超时30s
//设置路由
app.use(route.get('/buy', function*() {
    //用户id简单地每次请求递增1
    let num = globalUserId++;
    //调用request发起请求
    request({
        method: 'GET',
        timeout: timeout,
        uri: util.format(uri, num)
    }, function(error, req_res, body) {
        if (error) {
            this.status = 500
            this.error = error
        } else if (req_res.status != 200) {
            this.status = 500
        } else {
            this.body = body
        }
    })
}))
app.listen(5000, function() {
    console.log('server listen on 5000');
})