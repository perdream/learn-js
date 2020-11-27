const mysql = require("mysql");
const poolCluster = mysql.createPoolCluster({
    removeNodeErrorCount: 1, // Remove the node immediately when connection fails.
    defaultSelector: "RR" //RR,RANDOM,ORDER
});
const mysqlNodes = {
    node1: {
        host: "mysql_host",
        port: 3306,
        user: "root",
        password: "mysql_password",
        database: "my_test_database",
        charset: "utf8",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    node2: {
        host: "mysql_host",
        port: 3306,
        user: "root",
        password: "mysql_password",
        database: "my_test_database",
        charset: "utf8",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    node3: {
        host: "mysql_host",
        port: 3306,
        user: "root",
        password: "mysql_password",
        database: "my_test_database",
        charset: "utf8",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
};
for (let node in mysqlNodes) {
    poolCluster.add(`${node}`, mysqlNodes[`${node}`]);
}

class MysqlModel {
    /**
     * 实例化mysql
     */
    getConnection() {
        return new Promise((resolve, reject) => {
            poolCluster.getConnection(function(err, connection) {
                if (err) {
                    reject(err);
                } else {
                    console.log(60, 'mysql连接成功')
                    resolve([
                        connection,
                        poolCluster
                    ]);
                }
            })
        })
    }

}

async function mysqlDBUtil() {
    try {
        const db = new MysqlModel();
        const [conn, pool] = await db.getConnection();
        /**
         * 回滚事务
         */
        const rollback = async function() {
            conn.rollback();
            console.log('mysql事务发生回滚......rollback')
        }

        /**
         * 数据库操作
         * @param {} sql
         * @param {*} options
         */
        const query = function(sql, options) {
            return new Promise((resolve, reject) => {
                conn.query(sql, options, function(error, results, fields) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                })
            })
        }

        /**
         *提交事务
         */
        const commit = function() {
                return new Promise((resolve, reject) => {
                    conn.commit(function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            console.log('mysql事务提交......commit')
                            resolve(true);
                        }
                    });
                })
            }
            /**
             * 关闭连接池，mysql2的包自己不会释放
             */
        const close = async function() {
            conn.release();
            console.log('mysql连接池释放.....release');
        }
        return {
            rollback,
            commit,
            close,
            query
        }
    } catch (error) {
        throw error;
    }
}
module.exports = mysqlDBUtil;

//调用
var express = require("express");
var router = express.Router();
const mysqlUtil = require("../mysql");
/*
 * 可以在MYSQL中执行show status like 'Threads%',查看连接数
 */
router.get("/", async function(req, res, next) {
    for (let i = 0; i < 5000; i++) {
        const db = await mysqlUtil();
        const sql = "select * from user limit 0,100";
        const result = await db.query(sql);
        await db.close();
        console.log(i, result)
    }
    res.send('ok');
});

module.exports = router;　　