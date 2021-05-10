const fs = require('fs')
const path = require('path')

//sincrona
// fs.readFile('./assets/photoprofile.jpeg', (error, buffer) => {
//     fs.writeFile('./assets/photoprofile2.jpeg', buffer, (erro))
// })
module.exports = (pathImage, fileName, callback) => {
    const typeValidImagesExtensions = [ 'jpg', 'png', 'jpeg' ]
    const typeExtensionFileName = path.extname(pathImage)

    const invalidExtension = typeValidImagesExtensions
                            .indexOf(typeExtensionFileName.substr(1)) === -1 //a partir do ponto
    if(invalidExtension) {
        const erro = 'Extension of images is invalid'
        console.log('Erro: Extension of images is invalid')
        callback(erro)
    } else {
        const newPath = `./assets/images/${fileName}${typeExtensionFileName}`
        //assicrona
        fs.createReadStream(pathImage)
            .pipe(fs.createWriteStream(newPath))
            .on('finish', () => callback(false, newPath))
    }
}