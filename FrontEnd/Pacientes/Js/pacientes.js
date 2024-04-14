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
            let opcionesExamen = Tipo_Examen.map(tipo => 
                `<option ${tipo === Tipo_Examen ? "selected" : ""}>${tipo}</option>`
            ).join('');

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
                <td>
                <select id="examenEdit_${_id}" class="form-select">
                        ${opcionesExamen}
                    </select>
                </td>
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