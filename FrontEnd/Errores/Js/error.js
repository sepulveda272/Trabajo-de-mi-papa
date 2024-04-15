document.addEventListener("DOMContentLoaded", () => {
    verificarCambioDeMes();
    construirYActualizarTabla();
});

function verificarCambioDeMes() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Obtener el mes actual (1-12)
    const lastStoredMonth = parseInt(localStorage.getItem('lastStoredMonth')) || 0; // Obtener el último mes almacenado
    const lastLastStoredMonth = parseInt(localStorage.getItem('lastLastStoredMonth')) || 0; // Obtener el último mes almacenado

    if (currentMonth !== lastStoredMonth) {
        // Si hay un cambio de mes, guardar los datos del mes anterior y reiniciar los contadores para el nuevo mes
        guardarDatosMesAnterior(lastStoredMonth);
        guardarDatosMesAnteriorAnterios(lastLastStoredMonth);
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
function guardarDatosMesAnteriorAnterios(lastLastMonth) {
    const contadores = ['contador1', 'contador2', 'contador3','contador4']; // Nombres de los contadores a reiniciar
    contadores.forEach(contador => {
        const contadorValue = parseInt(localStorage.getItem(contador) || '0');
        localStorage.setItem(`contador${lastLastMonth}_${contador}`, contadorValue.toString());
        localStorage.removeItem(contador); // Reiniciar el contador actual
    });
}

function reiniciarContadores(currentMonth) {
    const contadores = ['contador1', 'contador2', 'contador3','contador4']; // Nombres de los contadores a reiniciar
    contadores.forEach(contador => {
        localStorage.setItem(contador, '0'); // Reiniciar el contador para el nuevo mes
    });
}

function construirYActualizarTabla() {
    const contenedor = document.querySelector(".contenido");
    contenedor.innerHTML = ''; // Limpiar el contenido existente

    // Nombres de las categorías para cada contador
    const categorias = [
        "Paciente",
        "Exámenes Mal Ingresados",
        "Exámenes Faltantes",
        "Mal Ingresados"
    ];

    const estimado = [
        2,
        60,
        60,
        60
    ];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Obtener el mes actual y el mes anterior
    const fechaActual = new Date();
    const currentMonth = fechaActual.getMonth() + 1;  // Meses de 1 a 12
    const lastMonth = (currentMonth === 1) ? 12 : currentMonth - 1;
    const lastLastMonth = (lastMonth === 1) ? 12 : lastMonth - 1;


    // Crear y añadir filas para cada contador (tanto del mes actual como del mes anterior)
    for (let i = 0; i < categorias.length; i++) {
        // Obtener los valores del mes actual y del mes anterior
        const contadorValueCurrent = localStorage.getItem(`contador${i+1}_${currentMonth}`) || '0';
        const contadorValueLast = localStorage.getItem(`contador${i+1}_${lastMonth}`) || '0';
        const contadorValueLastLast = localStorage.getItem(`contador${i+1}_${lastLastMonth}`) || '0';

        // Calcular tiempo gastado y tiempo real para el mes actual
        const tiempoGastadoCurrent = contadorValueCurrent * estimado[i];
        const tiempoRealCurrent = 86400 - tiempoGastadoCurrent;

        // Calcular tiempo gastado y tiempo real para el mes anterior
        const tiempoGastadoLast = contadorValueLast * estimado[i];
        const tiempoRealLast = 86400 - tiempoGastadoLast;

        // Calcular tiempo gastado y tiempo real para el mes anterior
        const tiempoGastadoLastLast = contadorValueLastLast * estimado[i];
        const tiempoRealLastLast = 86400 - tiempoGastadoLastLast;

        // Crear filas para el mes actual y el mes anterior
        const newRowCurrent = `
            <tr>
                <th>${meses[currentMonth - 1]}</th>
                <th>${categorias[i]}</th>
                <th>${contadorValueCurrent}</th>
                <th>${estimado[i]} minutos</th>
                <th>${tiempoGastadoCurrent} min</th>
                <th>${86400} min</th>
                <th>${tiempoRealCurrent} min</th>
                <th>$1.460.000</th>
            </tr>
        `;
        const newRowLastLast = `
            <tr>
                <td>${meses[lastLastMonth - 1]}</td>
                <td>${categorias[i]}</td>
                <td>${contadorValueLastLast}</td>
                <td>${estimado[i]} minutos</td>
                <td>${tiempoGastadoLastLast} min</td>
                <td>${86400} min</td>
                <td>${tiempoRealLastLast} min</td>
                <td>$1.460.000</td>
            </tr>
        `;

        const newRowLast = `
            <tr>
                <td>${meses[lastMonth - 1]}</td>
                <td>${categorias[i]}</td>
                <td>${contadorValueLast}</td>
                <td>${estimado[i]} minutos</td>
                <td>${tiempoGastadoLast} min</td>
                <td>${86400} min</td>
                <td>${tiempoRealLast} min</td>
                <td>$1.460.000</td>
            </tr>
        `;

        // Añadir las nuevas filas al contenido del tbody
        contenedor.innerHTML += newRowLastLast + newRowLast + newRowCurrent;
    }
}
