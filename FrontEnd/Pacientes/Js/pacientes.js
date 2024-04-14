import { getData, addData } from "../Js/API.js";



document.addEventListener("DOMContentLoaded", async () => {
    await mostrarData();
});

function checkboxChanged(checkbox) {
    if (checkbox.checked) {
        contador++;
        checkbox.disabled = true;
    } 
    console.log("Contador de checkboxes marcados:", contador);
}

async function mostrarData() {
    try {
        
        // Obtener datos de los pacientes
        const pacientes = await getData(); 
        const contenedor = document.querySelector(".contenido");
        const arrayPacientes = pacientes;

        let contenidoHTML = "";

        // Generar HTML dinámicamente para cada paciente
        arrayPacientes.forEach((elemento) => {
            const { Nombre, Edad, Sexo, Celular, Identificacion, _id, Direccion, Hora, Tipo_Examen } = elemento;
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

        // Agregar el evento onclick a los checkboxes después de haber generado el contenido HTML
        document.querySelectorAll('.form-check-input').forEach(checkbox => {
            checkbox.addEventListener('click', function() {
                checkboxChanged(this);
            });
        });

    } catch (error) {
        console.log(error);
    }
}

let contador = 0; // Inicializamos el contador



const formPaciente = document.querySelector('#formPaciente');

formPaciente.addEventListener('submit',addPaciente);

async function addPaciente(e){
    e.preventDefault();
        const Nombre = document.getElementById("inputNombre").value;
        const Edad = document.getElementById("inputEdad").value;
        const Sexo = document.getElementById("inputSexo").value;
        const Direccion = document.getElementById("inputDireccion").value;
        const Celular = document.getElementById("inputCelular").value;
        const Identificacion = document.getElementById("inputIdentificacion").value;
        const Hora = document.getElementById("inputHora").value;

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const Tipo_Examen = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                Tipo_Examen.push(checkbox.nextElementSibling.textContent);
            }
        });

        const datosFormulario = {
            Nombre,
            Edad,
            Sexo,
            Direccion,
            Celular,
            Identificacion,
            Hora,
            Tipo_Examen
        };

        addData(datosFormulario);

}