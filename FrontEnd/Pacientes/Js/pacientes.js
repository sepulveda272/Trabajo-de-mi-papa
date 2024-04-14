import { getData, addData } from "../Js/API.js";



document.addEventListener("DOMContentLoaded", async () => {
    await mostrarData();
    setupCheckboxPersistence();
});

function checkboxChanged1(checkbox) {
    if (checkbox.checked) {
        contador1++;
        checkbox.disabled = true;
        localStorage.setItem('contador1', contador1.toString());
    }   
    console.log("Contador1 de checkboxes marcados:", contador1);
}

function checkboxChanged2(checkbox2) {
    if (checkbox2.checked) {
        contador2++;
        checkbox2.disabled = true;
        localStorage.setItem('contador2', contador2.toString());
    } 
    console.log("Contador2 de checkboxes marcados:", contador2);
}
function checkboxChanged3(checkbox3) {
    if (checkbox3.checked) {
        contador3++;
        checkbox3.disabled = true;
        localStorage.setItem('contador3', contador3.toString());
    } 
    console.log("Contador3 de checkboxes marcados:", contador3);
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
            const { Nombre, Edad, Sexo, Celular,Identificacion,_id,Direccion,Hora,Tipo_Examen,Fecha} = elemento;
            let opcionesExamen = Tipo_Examen.map(tipo => 
                `<option ${tipo === Tipo_Examen ? "selected" : ""}>${tipo}</option>`
            ).join('');
            contenidoHTML += `
            <tr>
                <th scope="row">${_id}</th>
                <td>${Nombre} <input class="form-check-input1" type="checkbox"></td>
                <td>${Edad} <input class="form-check-input1" type="checkbox"></td>
                <td>${Sexo} <input class="form-check-input1" type="checkbox"></td>
                <td>${Identificacion} <input class="form-check-input1" type="checkbox"></td>
                <td>${Celular} <input class="form-check-input1" type="checkbox"></td>
                <td>${Direccion} <input class="form-check-input1" type="checkbox"></td>
                <td>${Fecha} <input class="form-check-input1" type="checkbox"></td>
                <td>${Hora} <input class="form-check-input1" type="checkbox"></td>
                <td>
                <select id="examenEdit_${_id}" class="form-select">
                    ${Tipo_Examen}
                </select>
                <input class="form-check-input2" type="checkbox">
                <label class="form-check-label" for="inputExamen4">No Coinciden</label>
                <input class="form-check-input3" type="checkbox">
                <label class="form-check-label" for="inputExamen4">Incompletos</label>
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

        // Agregar el evento onclick a los checkboxes después de haber generado el contenido HTML
        document.querySelectorAll('.form-check-input1').forEach(checkbox => {
            checkbox.addEventListener('click', function() {
                checkboxChanged1(this);
            });
        });
        document.querySelectorAll('.form-check-input2').forEach(checkbox2 => {
            checkbox2.addEventListener('click', function() {
                checkboxChanged2(this);
            });
        });
        document.querySelectorAll('.form-check-input3').forEach(checkbox3 => {
            checkbox3.addEventListener('click', function() {
                checkboxChanged3(this);
            });
        });

    } catch (error) {
        console.log(error);
    }
}


function setupCheckboxPersistence() {

    const checkboxes = document.querySelectorAll('.form-check-input1, .form-check-input2, .form-check-input3');
    
    const checkboxState = JSON.parse(localStorage.getItem('checkboxState')) || {};

    checkboxes.forEach((checkbox, index) => {
        const key = `checkbox-${index}`; 

        if (checkboxState.hasOwnProperty(key)) {
            checkbox.checked = checkboxState[key].checked;

            if (checkbox.checked) {
                checkbox.disabled = true;
            }
        }

        checkbox.addEventListener('change', function() {
            checkboxState[key] = { checked: this.checked };

            localStorage.setItem('checkboxState', JSON.stringify(checkboxState));
        });
    });
}




let contador1 = parseInt(localStorage.getItem('contador1') || '0');
let contador2 = parseInt(localStorage.getItem('contador2') || '0');
let contador3 = parseInt(localStorage.getItem('contador3') || '0');




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
        const Fecha = document.getElementById("inputFecha").value;
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
            Fecha,
            Hora,
            Tipo_Examen
        };

        addData(datosFormulario);
        window.location.href= 'Home.html'
}