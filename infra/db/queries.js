const connection = require('./connection')

const executeQuery = (query, params = '') => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (erro, result, fields) => {
            if(erro) reject(erro)
            else resolve(result)
        })
    })
}

module.exports = executeQuery