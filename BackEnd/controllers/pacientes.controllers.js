import { ObjectId } from "mongodb";
import connection from "../db/conection.js";

const getData = async(req,res)=>{
    try {
        const db = await connection();
        const collection = db.collection('paciente');
        const response = await collection.find().toArray();
        res.send(response);
    } catch (error) {
        res.status(404).send(error);
    }
}

const addData = async(req,res)=>{
    try {
        const db = await connection();
        const collection = db.collection('paciente');
        
        const data = req.body;
            await collection.insertOne(data);
            res.send({
                msg:'paciente registrado',
                data:data
            })
    } catch (error) {
        res.status(404).send(error);
    }
}

const updData = async(req,res)=>{
    try {
        const db = await connection();
        const collection = db.collection('paciente');
        const objId = new ObjectId(req.params.id);
        const data = req.body

        const validateId = await collection.findOne({_id:objId});
        if(!validateId){
            res.status(404).send({msg:'Invalid ID'});
        }
        else{
            await collection.findOneAndUpdate({_id:objId},{$set:data});
            res.send({
                msg:"paciente actualizado"
            })
        }
    } catch (error) {
        res.status(404).send({msg:'No se encontro el paciente'});
    }
}

const delData = async(req,res)=>{
    try {
        const db = await connection();
        const collection = db.collection('paciente');
        const objId = new ObjectId(req.params.id);

        const validateId = await collection.findOne({_id:objId});
        if(!validateId){
            res.status(404).send({msg:'Invalid ID'});
        }
        else{
            await collection.deleteOne({_id:objId});
            res.send({msg:'Paciente eliminado'});
        }
    } catch (error) {
        res.status(404).send({msg:'No se encontro el paciente'});
    }
}

export{
    delData,
    getData,
    addData,
    updData
}