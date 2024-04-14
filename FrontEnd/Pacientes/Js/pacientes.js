import {addData,delData,getData,putData} from "./API.js";

document.addEventListener("DOMContentLoaded", () => {
    mostrarData()
});
async function mostrarData(){
    try {
        const pacientes = await getData();
        const contenedor = document.querySelector(".contenido");
        const arrayPacientes = pacientes

        let contenidoHTML = "";

        arrayPacientes.forEach((elemento) => {
            const { Nombre, Edad, Sexo, Celular,_id,Direccion,Hora,Tipo_Examen} = elemento;
            contenidoHTML += `
            <tr>
                <th scope="row">${_id}</th>
                <td>${Nombre}</td>
                <td>${Edad}</td>
                <td>${Sexo}</td>
                <td>${Celular}</td>
                <td>${Direccion}</td>
                <td>${Hora}</td>
                <td>${Tipo_Examen}</td>
                    <button class="btn update" style="background-color: #937DE9;" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Actualizar
                    </button>
                </td>
                <td><button class="btn btn-danger eliminar" id="${_id}">Borrar</button></td>
            </tr>
            `;
        });
    
        contenedor.innerHTML = contenidoHTML;
    } catch (error) {
        console.log(error);
    }
}
