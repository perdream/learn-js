/*BroadCastChannel*/
//创建广播通讯通道，监听同一通道的页面可互相通讯
const bc = new BroadcastChannel()
    //postMessage
bc.postMessage('hello');
//listen message
bc.onnessage = (event) => {
    console.log(event)
};
//listen message error
bc.onmessageerror = (error) => {
    console.log(error)
};
//close channel
bc.close()

/**
 * Service Worker
 * Service Worker长期在后台运行，作为消息的处理中心，实现与注册了相同Service Worker 脚本的页面双向通讯
 * register 方法奇妙之处在于服务工作线程文件所在网域
 * 
 * 
 * chrome://inspect/#service-workers查看service worker 是否启动
 */
//page register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.worker.js').then(() => {
            console.log('注册成功')
        }, (error) => {
            console.log('ServiceWorker registration failed: ', error);
        })
    })
}

// sw.worker.js
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/styles/main.css',
    '/script/main.js'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

//拦截请求，命中缓存数据则返回，否则重新请求数据返回并缓存
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }

            // IMPORTANT:Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function(response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // IMPORTANT:Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        })
    );
});