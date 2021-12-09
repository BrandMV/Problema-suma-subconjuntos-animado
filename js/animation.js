/*-----------------IMPORTAMOS TODOS LOS MÓDULOS DE ANIMACIÓN-----------------*/
import { main as fuerzaBruta } from './fuerza-bruta/brute-force-algorithm.js';

/*--------------------------VARIABLES GLOBALES--------------------------- */

// Constantes para la actualización del velocímetro del DOM
const sel_ejecucion = document.querySelector('#sel_ejecucion');
const velocidad = document.querySelector('.seleccion-velocidad');
const txtNum = document.getElementById("output");
const bRange = document.getElementById("bRange");

// Constante para la actualización del modal al abrirlo
const modal_panel = document.querySelector('.panel-control div[data-toggle="modal"]');

// Contantes para el manejo de valores del arreglo del DOM
const agregarI = document.getElementById("agregarI");
const contenedor = document.querySelector('#contenedor-arreglo');
const tamArr = document.getElementById("numArr");
var n_valores = 0; // Número de valores del arreglo
var indx = 0; // Indice de cada div de arreglo

// Constante para la suma deseada
const inpSuma = document.querySelector("#contenedor-suma input");

// Constante para guardar los datos
const sel_algoritmo = document.querySelector('#contenedor-algoritmo select');
const btn_guardar = document.querySelector('#btn-guardar');

// Objeto de valores y algoritmos
const configs = {
    algoritmo: "",
    valores: [],
    suma: 0,
    tipo_animacion: "PXP",
    velocidad: 1
}
const algoritmos = {
    1: 'Fuerza bruta',
    2: 'DP Top-Down',
    3: 'DP Bottom-Up'
}

// Constante para actualizar el panel de control
const arreglo_panel = document.querySelector('#arreglo');

// Constante para el botón de simular
const btn_simular = document.querySelector('#btn-simular');

btn_guardar.disabled = true;

/*----------------MANEJO DEL PANEL DE CONTROL EN EL DOM------------------*/

/**
 * Función para ctualizar el velocimetro al escoger el modo de ejecución
 */
sel_ejecucion.addEventListener('change', function() {
    // Mostramos el velocímetro si es modo automático
    if (sel_ejecucion.value == 2) {
        velocidad.classList.remove('d-none');
        btn_simular.textContent = 'Simular';
        configs.tipo_animacion = "AUTO";
    } else { // Oculamos el velocímetro si es modo paso por paso
        velocidad.classList.add('d-none');
        btn_simular.textContent = 'Avanzar';
        configs.tipo_animacion = "PXP";
    }
});

/**
 * Función para Actualizar el valor del velocímetro al ser desplazado
 */
bRange.addEventListener("input", function() {
    txtNum.textContent = bRange.value + "s";
    configs.velocidad = bRange.value;
});


/**
 * Función para actualizar los valores del modal al ser abierto
 * conforme a los parámetros del objeto configs
 */
modal_panel.addEventListener('click', () => {
    // Limpiamos el areglo del modal
    let valor = contenedor.firstElementChild;
    while (valor != null && valor.classList.contains("valor")) {
        contenedor.removeChild(valor);
        valor = contenedor.firstElementChild;
    }

    // Insertamos los valores que se tienen en el arreglo sobre el modal
    n_valores = 0;
    indx = 0;
    configs.valores.forEach(val => {
        agregarValorArreglo(val);
    });

    // Asignamos el valor de la suma
    inpSuma.value = configs.suma;

    // Asignamoes el valor del algoritmo
    sel_algoritmo.value = configs.algoritmo || 0;
});

/**
 * Función para agregar valores al arreglo al click en el botón de agregar
 */
agregarI.addEventListener("click", function() {
    agregarValorArreglo(1);
});

/**
 * Función para guardar todos los datos editados al click en el 
 * botón guardar del modal
 */
const error = document.getElementById("errorArr");
btn_guardar.addEventListener("click", function() {
    // Reinicializamos el arreglo
    configs.valores = [];

    // Guardamos cada uno de los valores del DOM
    let valor = contenedor.firstElementChild;
    while (valor != null) {
        if (valor.classList.contains("valor")) {
            configs.valores.push(valor.firstElementChild.value);
        }
        valor = valor.nextElementSibling;
    }

    // Guardamos la suma deseada
    configs.suma = parseInt(inpSuma.value);

    // Guardamos el algoritmo
    configs.algoritmo = sel_algoritmo.selectedIndex;

    // Actualizamos el panel de control para que se muestren los datos
    actualizarPanel();

});

/**
 * Función que indexa todos el algoritmo con toddos sus paramétros y 
 * comienza la ejecución de la simulación
 */
btn_simular.addEventListener("click", function() {
    // Validamos que los datos estén correctos
    if (!validarDatos()) {
        return;
    }


    // Indexamos el algoritmo seleccionado
    if (algoritmos[configs.algoritmo] == 'Fuerza bruta') {
        // Activamos el div de los nodos y el canvas para las flechas
        const paneles_fuerza_bruta = document.querySelectorAll('.animacion-brute-force');
        paneles_fuerza_bruta.forEach(panel => {
            panel.classList.remove('d-none');
        });

        fuerzaBruta();

    } else if (algoritmos[configs.algoritmo] == 'DP Top-Down') {
        // Activamos el div de los nodos y el canvas para las flechas
        const paneles_top_down = document.querySelectorAll('.animacion-Top-Down');
        paneles_top_down.forEach(panel => {
            panel.classList.remove('d-none');
        });

        fuerzaBruta();

    } else if (algoritmos[configs.algoritmo] == 'DP Bottom-Up') {

    }
});


/*--------------------------------FUNCIONES AUXILIARES------------------------------*/
/**
 * Función para eliminar un valor del DOM respecto al índice que se le asignó
 * @param {int} id Indice de ese velor dentro del arreglo del DOM
 */
window.eliminarValor = (id) => { // La hacemos global para el html
    // Obtenemos el div que contiene el valor y el botón de eliminar
    const elemento = document.querySelector(`[data-indx="${id}"]`);
    contenedor.removeChild(elemento);

    // Decrementamos el contador y actualizamos el DOM
    n_valores--;
    tamArr.textContent = "n: " + n_valores;

    // Reinicializamos el índice si se queda sin elementos
    if (n_valores == 0) {
        indx = 0;
    }
}

/**
 * Función que agrega un valor dado al modal del DOM 
 * @param {int} val Valor que se agregará al DOM
 */
function agregarValorArreglo(val) {
    // Creamos un nuevo div y le ponemos su index
    var nuevo_valor = document.createElement('div');
    nuevo_valor.className = "valor bd-highlight d-flex justify-content-start m-1 w-100 align-items-center";
    nuevo_valor.dataset.indx = indx;

    // Creamos los dos divs para el valor y el botón de eliminar junto con
    // su llamada a la función eliminar valor
    nuevo_valor.innerHTML = `<input type="number" class="input-num text-center w-75" value="${val}" min="1" name="array[]" oninput='verficarValor(${indx})'>
    <div class="bg-danger b-redondeado px-2 fs-2 minus" onclick='eliminarValor(${indx})'>
        <p class="text-white fw-bolder minus">-</p>
    </div>`;

    // Inrementamos el índice y el contador
    indx++;
    n_valores++;

    // Actualizamos el DOM
    tamArr.textContent = "n: " + n_valores;
    contenedor.insertBefore(nuevo_valor, agregarI.parentElement);
}

window.verficarValor = (id) => { // La hacemos global para el html

    const elemento = document.querySelector(`div[data-indx="${id}"] input`);
    
    console.log(elemento.value);
}

/**
 * Función para actualizar el panel de control conforme a los datos del algoritmo que se
 * implementará
 */
function actualizarPanel() {
    // Actualizamos el arreglo
    let arreglo_text = `Arreglo[${configs.valores.length}] = [`;
    arreglo_text += configs.valores.join(', '); // Unimos todo con las comas
    arreglo_panel.textContent = arreglo_text + ']';

    // Actualizamos el algoritmo y suma
    let algoritmo = algoritmos[configs.algoritmo];
    arreglo_panel.nextElementSibling.textContent = `Algoritmo: ${algoritmo} | Suma: ${configs.suma}`;
}

/**
 * Función para validar que los datos de la ejecución estén correctos y se pueda simular
 */
function validarDatos() {
    return;
}