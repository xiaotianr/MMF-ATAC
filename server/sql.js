const mysql = require("mysql");
// HomogseData = require('./HOMOgse.json');

const db = mysql.createPool({
    connectionLimit: 10,    // 连接数量
    // host:"192.168.3.15",
    host:'localhost',
    port:3306,
    user:'root',
    // user:'wuxt',
    password:'123456',
    // password:'wxt123456',
    database:'gse'
})
// db.connect();

// var type = 'gse170'
module.exports =db;
// db.query(`select * from allgse where gse like '%${type}%'`,function(err,data){
//     if(err) throw err;
//     console.log(data);})

//     db.end();

