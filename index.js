const customExpress = require('./config/customExpress')
const connection = require('./infra/db/connection')
const Tables = require('./infra/db/tables')

connection.connect(error => {
    if(error) console.log(error)
    else{
        console.log( 'Connection has success' )

        Tables.init( connection )

        const app = customExpress()
        app.listen(3000, ()=> console.log('Server in port 3000'))
    } 
})
