const multer = require('multer');


const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/jpeg': 'jpg',
}


const storage =  multer.diskStorage({
    destination: (req, file, callback)=>{

         callback(null, 'public/images/articles');
    },
    filename: (req, file, callback)=>{
        var name = Math.floor(Math.random() * Math.floor(35645614)).toString();
        name += Math.floor(Math.random() * Math.floor(35645614)).toString();
        name += Math.floor(Math.random() * Math.floor(35645614)).toString();
        name += Date.now()

        var extension = MIME_TYPES[file.mimetype]

        name += '.'+extension;

        callback(null, name)
    }
})

module.exports = multer({storage}).single('image')