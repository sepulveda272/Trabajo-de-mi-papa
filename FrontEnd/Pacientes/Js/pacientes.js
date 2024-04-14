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
                <td>${Nombre}</td>
                <td>${Edad}</td>
                <td>${Sexo}</td>
                <td>${Identificacion}</td>
                <td>${Celular}</td>
                <td>${Direccion}</td>
                <td>${Hora}</td>
                <td>${Tipo_Examen}</td>
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


const formPaciente = document.querySelector('#formPaciente');

formPaciente.addEventListener('submit',addPaciente);

async function addPaciente(e){
    e.preventDefault();
        const nombre = document.getElementById("inputNombre").value;
        const edad = document.getElementById("inputEdad").value;
        const sexo = document.getElementById("inputSexo").value;
        const direccion = document.getElementById("inputDireccion").value;
        const celular = document.getElementById("inputCelular").value;
        const fecha = document.getElementById("inputFecha").value;
        const hora = document.getElementById("inputHora").value;

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const examenesSeleccionados = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                examenesSeleccionados.push(checkbox.nextElementSibling.textContent);
            }
        });

        const datosFormulario = {
            nombre,
            edad,
            sexo,
            direccion,
            celular,
            fecha,
            hora,
            examenesSeleccionados
        };

        addData(datosFormulario);

}