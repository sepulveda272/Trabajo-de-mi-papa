import express from "express";
import cors from "cors";
import pacienteRoutes from "../routes/pacientes.routes.js";
import erroresRoutes from "../routes/errores.routes.js";

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT123;

        this.rutas = {
            pacientes:'/pacientes',
            errores:'/errores'
        }

        this.middlewares();

        this.routes();


    }

    listener(){
        this.app.listen(this.port,()=>{
            console.log(`Server running in port ${this.port}`);
        })
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes(){
        this.app.use(this.rutas.pacientes,pacienteRoutes);
        this.app.use(this.rutas.errores,erroresRoutes);
    }
}



export default Server;