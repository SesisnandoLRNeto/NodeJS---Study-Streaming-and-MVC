const pets = require("../models/petsModel")

module.exports = app => {
    app.post('/pet', (req, res) => {
        const pet = req.body

        pets.create(pet, res)
    })
}