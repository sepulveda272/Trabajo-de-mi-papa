const addData = async(req,res)=>{
    try {
        const db = await connection();
        const collection = db.collection('errrores');
        
        const data = req.body;
            await collection.insertOne(data);
            res.send({
                msg:'errores registrado',
                data:data
            })
    } catch (error) {
        res.status(404).send(error);
    }
}

const updData = async(req,res)=>{
    try {
        const db = await connection();
        const collection = db.collection('errores');
        const objId = new ObjectId(req.params.id);
        const data = req.body

        const validateId = await collection.findOne({_id:objId});
        if(!validateId){
            res.status(404).send({msg:'Invalid ID'});
        }
        else{
            await collection.findOneAndUpdate({_id:objId},{$set:data});
            res.send({
                msg:"errores actualizado"
            })
        }
    } catch (error) {
        res.status(404).send({msg:'No se encontro el errores'});
    }
}


export {
    addData,
    updData
}