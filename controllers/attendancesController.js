const Attendances = require("../models/attendancesModel")

module.exports = app => {
    app.get('/attendance', (req, res) => {
        Attendances.listAll()
            .then(result => res.status(200).json(result))
            .catch(erro => res.status(400).json(erro))
    })
    
    app.get('/attendance/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Attendances.findById(id, res)
    })

    app.post('/attendance', (req, res) => {
        const attendance = req.body

        Attendances.create(attendance)
            .then(result => res.status(200).json(result))
            .catch(erro => res.status(400).json(erro))
    })

    app.patch('/attendance/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body

        Attendances.update(id, values, res)
    })

    app.delete('/attendance/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Attendances.delete(id, res)
    })
}