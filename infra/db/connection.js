const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Uphard123@root',
    database: 'petshop-schedule'
})

module.exports = connection