const url = 'http://localhost:5000'


const getData = async()=>{
    try {
        const response = await fetch(`${url}/pacientes/get`)   
        const result = response.json();
        return result     
    } catch (error) {
        console.log(error);
    }
}

const addData = async(datos)=>{
    try {
            await fetch(`${url}/pacientes/add`, {
            method: 'post',
            body: JSON.stringify(datos),
            headers: headers
        });
    } catch (error) {
        console.log(error);
    }
}


const putData = async(dato,id)=>{
    try {
        await fetch(`${url}/pacientes/upd/${id}`,{
            method:'PUT',
            body:JSON.stringify(dato),
            headers:headers
        });
    } catch (error) {
        console.log(error);
    }
}


const delData =async(id)=>{
    try {
        await fetch(`${url}/pacientes/del/${id}`,{
            method:'DELETE',
            headers:headers
        });
    } catch (error) {
        console.log(error);
    }
}


export {
    addData,
    getData,
    delData,
    putData
}
