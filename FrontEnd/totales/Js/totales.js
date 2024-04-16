document.addEventListener("DOMContentLoaded", () => {
    mostrarTabla();
});

function mostrarTabla(){
    const tabla = document.querySelector(".contenido")

    let contenidoHTML = "";

    contenidoHTML = `
    <tr>
                            <th scope="row" rowspan="4">Febrero</th>
                            <td>Glicemia</td>
                            <td>653</td>
                            <td>14</td>
                            <td>${((14*100)/653).toFixed(2)}%</td>
                            <td>${(100-((14*100)/653)).toFixed(2)}%</td>
                          </tr>
                          <tr>
                            <td>Colesterol</td>
                            <td>539</td>
                            <td>43</td>
                            <td>${((43*100)/539).toFixed(2)}%</td>
                            <td>${(100-((43*100)/539)).toFixed(2)}%</td>
                          </tr>
                          <tr>
                            <td>Trigliceridos</td>
                            <td>543</td>
                            <td>12</td>
                            <td>${((12*100)/543).toFixed(2)}%</td>
                            <td>${(100-((12*100)/543)).toFixed(2)}%</td>
                          </tr>
                          <tr>
                            <td>Creatinina</td>
                            <td>210</td>
                            <td>7</td>
                            <td>${((7*100)/210).toFixed(2)}%</td>
                            <td>${(100-((7*100)/210)).toFixed(2)}%</td>
                          </tr>
                          <tr>
                            <th scope="row" rowspan="4">Marzo</th>
                            <td>Glicemia</td>
                            <td>784</td>
                            <td>45</td>
                            <td>${((45*100)/784).toFixed(2)}%</td>
                            <td>${(100-((45*100)/784)).toFixed(2)}%</td>
                          </tr>
                          <tr>
                            <td>Colesterol</td>
                            <td>605</td>
                            <td>52</td>
                            <td>${((52*100)/605).toFixed(2)}%</td>
                            <td>${(100-((52*100)/605)).toFixed(2)}%</td>
                          </tr>
                          <tr>
                            <td>Trigliceridos</td>
                            <td>605</td>
                            <td>14</td>
                            <td>${((14*100)/605).toFixed(2)}%</td>
                            <td>${(100-((14*100)/605)).toFixed(2)}%</td>
                          </tr>
                          <tr>
                            <td>Creatinina</td>
                            <td>350</td>
                            <td>12</td>
                            <td>${((12*100)/350).toFixed(2)}%</td>
                            <td>${(100-((12*100)/350)).toFixed(2)}%</td>
                          </tr>
    `;

    tabla.innerHTML = contenidoHTML
}