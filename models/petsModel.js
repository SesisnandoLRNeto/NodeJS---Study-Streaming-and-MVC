const { connection } = require("../infra/db/tables")
const uploadFiles = require("../infra/files/uploadFiles")

class Pets {
    create(pet, res) {
        const sql = 'INSERT INTO Pets SET ?'

        uploadFiles(pet.image, pet.name, (erro, newPath) => {
            if(erro) {
                res.status(400).json({ erro }) 
            } else {
                const newPet = { name: pet.name, image: newPath }

                connection.query(sql, newPet, (erro) => {
                    if(erro) res.status(400).json(erro)
                    else {
                        res.status(200).json(newPet)
                    }
                })
            }
            
        })
    }

}

module.exports = new Pets()