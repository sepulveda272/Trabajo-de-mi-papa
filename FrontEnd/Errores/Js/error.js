document.addEventListener("DOMContentLoaded", () => {
    construirYActualizarTabla();
});

function construirYActualizarTabla() {
    const contenedor = document.querySelector(".contenido");
    contenedor.innerHTML = ''; // Limpiar el contenido existente

    // Nombres de las categorías para cada contador
    const categorias = [
        "Paciente",
        "Exámenes Mal Ingresados",
        "Exámenes Faltantes"
    ];

    const estimado = [
        2,
        60,
        60
    ];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Obtener el mes actual (0-11)
    const fechaActual = new Date();
    const mesActual = meses[fechaActual.getMonth()];  
    const currentMonth = new Date().getMonth() + 1;

    // Crear y añadir filas para cada contador
    for (let i = 0; i < categorias.length; i++) {
        const contadorValue = localStorage.getItem(`contador${i+1}_${currentMonth}`) || '0'; // Obtener el contador correspondiente al mes actual
        const tiempoGastado = contadorValue * estimado[i];
        const Trabajo = 86400
        const tiempoReal = Trabajo - tiempoGastado
        const newRow = `
            <tr>
                <td>${i+1}</td>
                <td>${mesActual}</td> <!-- Aquí deberías mostrar el nombre del mes actual -->
                <td>${categorias[i]}</td>
                <td>${contadorValue}</td>
                <td>${estimado[i]} minutos</td>
                <td>${tiempoGastado} min</td>
                <td>${Trabajo} min</td>
                <td>${tiempoReal} min</td>
            </tr>
        `;
        contenedor.innerHTML += newRow; // Añadir la nueva fila al contenido del tbody
    }
}
