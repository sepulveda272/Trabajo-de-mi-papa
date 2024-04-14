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
            const { Nombre, Edad, Sexo, Celular,Identificacion,_id,Direccion,Hora,Tipo_Examen} = elemento;
            contenidoHTML += `
            <tr>
                <th scope="row">${_id}</th>
                <td>${Nombre} <input class="form-check-input" type="checkbox"></td>
                <td>${Edad} <input class="form-check-input" type="checkbox"></td>
                <td>${Sexo} <input class="form-check-input" type="checkbox"></td>
                <td>${Identificacion} <input class="form-check-input" type="checkbox"></td>
                <td>${Celular} <input class="form-check-input" type="checkbox"></td>
                <td>${Direccion} <input class="form-check-input" type="checkbox"></td>
                <td>${Hora} <input class="form-check-input" type="checkbox"></td>
                <td>${Tipo_Examen} <input class="form-check-input" type="checkbox"></td>
                <td>
                    <button class="btn update" style="background-color: #937DE9;" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Actualizar
                    </button>
                </td>
            </tr>
            `;
        });
    
        contenedor.innerHTML = contenidoHTML;
    } catch (error) {
        console.log(error);
    }
}
