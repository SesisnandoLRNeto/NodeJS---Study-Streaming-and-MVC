class Tables {
    init(connection) {
        this.connection = connection
        
        this.createAttendance()
        this.createPet()
    }

    createAttendance() {
        const sql = 'CREATE TABLE IF NOT EXISTS Attendance '+
        '(id int NOT NULL AUTO_INCREMENT, '+
        ' client varchar(11) NOT NULL, '+
        ' pet varchar(20), '+
        ' service varchar(20) NOT NULL, '+
        ' status varchar(20) NOT NULL , '+
        ' data datetime NOT NULL, data_created datetime NOT NULL, '+
        ' description text, PRIMARY KEY(id))'

        this.connection.query(sql, (erro) => {
            if(erro) console.log(erro)
            else{
                console.log('Table Attendance created with success')
            }
        })
    }

    createPet() {
        const sql = 'CREATE TABLE IF NOT EXISTS Pets '+
        '(id int NOT NULL AUTO_INCREMENT, '+
        'name varchar(50) NOT NULL, image varchar(200) NOT NULL, '+ 
        'PRIMARY KEY(id))'

        this.connection.query(sql, (erro) => {
            if(erro) console.log(erro)
            else {
                console.log('Table Pets created with success')
            }
        })
    }
    
}

module.exports = new Tables