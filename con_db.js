const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'pass_hash'
}).promise()

module.exports = connection