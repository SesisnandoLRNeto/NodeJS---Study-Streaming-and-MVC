const connection = require("../infra/db/connection")
const moment = require("moment")
const axios = require("axios")
const repository = require('../repositories/attendancesRepository')

class Attendance { 

    constructor() {

        this.validations = [
            {
                name: 'date',
                valid: this.validData,
                message: 'This data must been the same or after of data created'
            },
            {
                name: 'client',
                valid: this.validName,
                message: 'This client must been more that 5 caracters'
            },
        ]
        this.valid = params => this.validations.filter(field => {
            const { name } = field
            const params = params[name]

            return !field.valid(params)
        })
        this.validData = ({ date, date_created }) =>  moment(date).isSameOrAfter(date_created)
        this.validName = (length) => length >= 5
    }

    create(attendance) {
        const date_created = moment().format('YYYY-MM-DD HH:MM:SS')
        const date = moment(attendance.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const attendance_data = { ...attendance, date_created, date }

        const params = {
            date: { date, date_created },
            client: { length: attendance.client.length }
        }

        const errorsCatch = this.valid(params)
        const errorExists = errorsCatch.length

        if(errorExists){
            return new Promise((resolve, reject) => reject(erro))
        } else {
            return repository.create(attendance_data)
                .then(result => {
                    attendance.id = result.insertId
                    return { ...attendance }
                })
        }
    }

    listAll() {
        return repository.list()
    }

    findById(id, res) {
        const sql = `SELECT * FROM Attendance WHERE id=${id}`

        connection.query(sql, async (error, result) => {
            const attendance = result[0]
            const cpf = attendance.client

            if(error) res.status(400).json(error)
            else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                attendance.client = data
                res.status(200).json(attendance)
            }
        })
    }

    update(id, values, res) {
        if(values.data) {
            values.data = moment(values.data).format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = 'UPDATE Attendance SET ? WHERE id=?'

        connection.query(sql, [ values, id ], (error, result) => {
            if(error) res.status(400).json(error)
            else {
                res.status(204).json({ ...values, id })
            }
        })

    }

    delete(id, res) {
        const sql = `DELETE FROM Attendance WHERE id=?`

        connection.query(sql, id, (error,result) => {
            if(error) res.status(400).json(error)
            else {
                res.status(200).json({ 
                    id,
                    message: result
                })
            }
        })
    }
}

module.exports = new Attendance