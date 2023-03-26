const express       = require('express');
const cors          = require('cors');
const { db }        = require('../database/config');
const fileUpload    = require('express-fileupload');

class Server{

    constructor(){
        this.app    = express();
        this.port   = process.env.PORT;
        this.path   = {
            estudiantes: '/api/estudiantes',
            candidatos: '/api/candidatos',
            usuarios: '/api/usuarios'
        };

        this.connectionDatabase();
        this.middlewares();
        this.routes();
    }

    async connectionDatabase(){
        try{
            await db.authenticate();
            console.log('DataBase Online');
        }catch(error){
            console.log(error);
        }
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp',
            createParentPath: true
        }))
    }

    routes(){
        this.app.use(this.path.estudiantes, require('../routes/estudiantes'));
        this.app.use(this.path.candidatos, require('../routes/candidatos'));
        this.app.use(this.path.usuarios, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto: ${this.port}`);
        });
    }

}

module.exports = Server;