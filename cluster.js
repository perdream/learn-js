const cluster = require('cluster')
const _ = require('lodash')
let shutdown_processing = false
const log = console.log

function reload(app) {
    if (shutdown_processing) {
        log('reloading');
        return;
    }

    shutdown_processing = true;
    const workers = _.map(app.workers, 'id');

    const killer = function(i) {
        if (i == workers.length) {
            log('all finished');
            shutdown_processing = false;
            return;
        }

        let curWorker = _.find(app.workers, { id: workers[i] });

        if (!curWorker) {
            log('already dead process ' + curWorker.process.pid);
            killer(++i);
            return;
        }

        log('killing worker ' + curWorker.process.pid);
        var shutdown_timer;
        //定时kill
        shutdown_timer = setTimeout(function(timeout_worker) {
            log('force kill');
            timeout_worker.kill();
        }, 15000, curWorker);
        //断开连接
        curWorker.send('graceful_shutdown');
        curWorker.disconnect();
        //断开完成
        curWorker.once('disconnect', function() {
            log('the worker ' + this.process.pid + ' has disconnected');
            clearTimeout(shutdown_timer);
            killer(++i);
        });

    };
    //递归杀死所有老进程，开启新进程
    killer(0);
}

export const regSig = (app) => {

    if (app.isMaster) {
        //接收进程SIGTERM信号
        process.on('SIGTERM', function() {
            reload(app)
        })

    } else {
        //接收master主进程消息
        process.on('message', function(msg) {
            app.server.close();

            if (msg === 'graceful_shutdown') {
                process.exit(0);
            }
        });
    }

}