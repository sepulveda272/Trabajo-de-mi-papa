import {getData,addData} from '../Js/API.js'

document.addEventListener("DOMContentLoaded", async () => {
    verificarCambioDeMes();
    await mostrarData();
    setupCheckboxPersistence();
});

function checkboxChanged1(checkbox) {
    if (checkbox.checked) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // Obtener el mes actual (0-11)
        localStorage.setItem(`fecha${currentMonth+1}`, currentDate.toISOString()); // Guardar la fecha actual en formato ISO
        let contador = parseInt(localStorage.getItem(`contador1_${currentMonth+1}`) || '0'); // Obtener el contador correspondiente al mes actual
        contador++;
        localStorage.setItem(`contador1_${currentMonth+1}`, contador.toString()); // Incrementar el contador
        checkbox.disabled = true;
        localStorage.setItem('contador1', contador.toString());
        console.log("Contador1 de checkboxes marcados:", contador);
    }
}

function checkboxChanged2(checkbox2) {
    if (checkbox2.checked) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // Obtener el mes actual (0-11)
        localStorage.setItem(`fecha${currentMonth+1}`, currentDate.toISOString()); // Guardar la fecha actual en formato ISO
        let contador = parseInt(localStorage.getItem(`contador2_${currentMonth+1}`) || '0'); // Obtener el contador correspondiente al mes actual
        contador++;
        localStorage.setItem(`contador2_${currentMonth+1}`, contador.toString()); // Incrementar el contador
        checkbox2.disabled = true;
        localStorage.setItem('contador2', contador.toString());
    }
}

function checkboxChanged3(checkbox3) {
    if (checkbox3.checked) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // Obtener el mes actual (0-11)
        localStorage.setItem(`fecha${currentMonth+1}`, currentDate.toISOString()); // Guardar la fecha actual en formato ISO
        let contador = parseInt(localStorage.getItem(`contador3_${currentMonth+1}`) || '0'); // Obtener el contador correspondiente al mes actual
        contador++;
        localStorage.setItem(`contador3_${currentMonth+1}`, contador.toString()); // Incrementar el contador
        checkbox3.disabled = true;
        localStorage.setItem('contador3', contador.toString());
    }
}
function checkboxChanged4(checkbox4) {
    if (checkbox4.checked) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // Obtener el mes actual (0-11)
        localStorage.setItem(`fecha${currentMonth+1}`, currentDate.toISOString()); // Guardar la fecha actual en formato ISO
        let contador = parseInt(localStorage.getItem(`contador4_${currentMonth+1}`) || '0'); // Obtener el contador correspondiente al mes actual
        contador++;
        localStorage.setItem(`contador4_${currentMonth+1}`, contador.toString()); // Incrementar el contador
        checkbox4.disabled = true;
        localStorage.setItem('contador4', contador.toString());
    }
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
            const { Nombre, Edad, Sexo, Celular,Identificacion,_id,Direccion,Hora,Tipo_Examen,Fecha,Sistema} = elemento;
            let opcionesExamen = Tipo_Examen.map(tipo => 
                `<option ${tipo === Tipo_Examen ? "selected" : ""}>${tipo}</option>`
            ).join('');
            let opcionesSistema = Sistema.map(tipo => 
                `<option ${tipo === Sistema ? "selected" : ""}>${tipo}</option>`
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
                    ${opcionesExamen}
                </select>
                <input class="form-check-input2" type="checkbox">
                <label class="form-check-label" for="inputExamen4">No Coinciden</label><br/>
                <input class="form-check-input3" type="checkbox">
                <label class="form-check-label" for="inputExamen4">Incompletos</label>
                </td>
                <td>
                    <select class="form-select">
                      ${opcionesSistema}
                    </select><br/>
                    <input class="form-check-input4" type="checkbox">
                    <label class="form-check-label" for="inputExamen5">Mal ingresados</label>
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
        document.querySelectorAll('.form-check-input4').forEach(checkbox3 => {
            checkbox3.addEventListener('click', function() {
                checkboxChanged4(this);
            });
        });

    } catch (error) {
        console.log(error);
    }
}


function setupCheckboxPersistence() {
    const checkboxes = document.querySelectorAll('.form-check-input1, .form-check-input2, .form-check-input3,.form-check-input4');
    let checkboxState = JSON.parse(localStorage.getItem('checkboxState')) || {};

    checkboxes.forEach((checkbox, index) => {
        const key = `checkbox-${index}`; 

        if (checkboxState.hasOwnProperty(key)) {
            checkbox.checked = checkboxState[key].checked;

            if (checkbox.checked) {
                checkbox.disabled = true;
            }
        }

        checkbox.addEventListener('change', function() {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth(); // Obtener el mes actual (0-11)
            localStorage.setItem(`fecha${currentMonth+1}`, currentDate.toISOString()); // Guardar la fecha actual en formato ISO
            const key = `checkbox-${index}`;
            checkboxState[key] = { checked: this.checked, date: currentDate.toISOString() }; // Guardar el estado del checkbox junto con la fecha actual

            localStorage.setItem('checkboxState', JSON.stringify(checkboxState));
        });
    });
}

function verificarCambioDeMes() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Obtener el mes actual (1-12)
    const lastStoredMonth = parseInt(localStorage.getItem('lastStoredMonth')) || 0; // Obtener el último mes almacenado

    if (currentMonth !== lastStoredMonth) {
        // Si hay un cambio de mes, guardar los datos del mes anterior y reiniciar los contadores para el nuevo mes
        guardarDatosMesAnterior(lastStoredMonth);
        reiniciarContadores(currentMonth);
        localStorage.setItem('lastStoredMonth', currentMonth);
    }
}

function guardarDatosMesAnterior(lastMonth) {
    const contadores = ['contador1', 'contador2', 'contador3','contador4']; // Nombres de los contadores a reiniciar
    contadores.forEach(contador => {
        const contadorValue = parseInt(localStorage.getItem(contador) || '0');
        localStorage.setItem(`contador${lastMonth}_${contador}`, contadorValue.toString());
        localStorage.removeItem(contador); // Reiniciar el contador actual
    });
}

function reiniciarContadores(currentMonth) {
    const contadores = ['contador1', 'contador2', 'contador3','contador4']; // Nombres de los contadores a reiniciar
    contadores.forEach(contador => {
        localStorage.setItem(contador, '0'); // Reiniciar el contador para el nuevo mes
    });
}





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
        const Sistema = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                Tipo_Examen.push(checkbox.nextElementSibling.textContent);
            }
        });

        const prueba = document.querySelectorAll('#inputExamenS')

        prueba.forEach(checkbox => {
            if (checkbox.checked) {
                Sistema.push(checkbox.nextElementSibling.textContent);
                console.log(Sistema);
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
            Tipo_Examen,
            Sistema
        };

        addData(datosFormulario);
}