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

    // Crear y añadir filas para cada contador
    for (let i = 0; i < categorias.length; i++) {
        const contadorValue = localStorage.getItem(`contador${i+1}`) || '0'; // Obtener valor del Local Storage o 0
        const tiempoGastado = contadorValue * estimado[i];
        const Trabajo = 86400
        const tiempoReal = Trabajo - tiempoGastado
        const newRow = `
            <tr>
                <td>${i+1}</td>
                <td>Febrero</td>
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
