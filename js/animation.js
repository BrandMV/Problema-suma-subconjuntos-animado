/*-----------------IMPORTAMOS TODOS LOS MÓDULOS DE ANIMACIÓN-----------------*/
import { main as fuerzaBruta, ui } from './fuerza-bruta/brute-force-algorithm.js';
import { main as bottom_up } from './bottom-up/bottom-up-algorithm.js';

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

//Constante para la muestra de errores en el formulario
const errorD = document.getElementById("errorDatos");

// Objeto de valores y algoritmos
window.configs = {
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
btn_simular.addEventListener("click", function(e) {
    // Removemos los restos de los algoritmos anteriores para limpiar el DOM
    removerRestos();

    // Indexamos el algoritmo seleccionado
    if (algoritmos[configs.algoritmo] === 'Fuerza bruta') {
        // Deshabilitamos el botón de simular
        
        // Activamos el div de los nodos y el canvas para las flechas
        const paneles_fuerza_bruta = document.querySelectorAll('.animacion-brute-force');
        paneles_fuerza_bruta.forEach(panel => {
            panel.classList.remove('d-none');
        });

        fuerzaBruta(configs);

    } else if (algoritmos[configs.algoritmo] === 'DP Bottom-Up') {
        // Deshabilitamos el botón de simular

        // Activamos el div de los nodos y el canvas para las flechas
        const paneles_bottom_up = document.querySelectorAll('.animacion-bottom-up');
        paneles_bottom_up.forEach(panel => {
            panel.classList.remove('d-none');
        });

        bottom_up(configs);

    } else if (algoritmos[configs.algoritmo] == 'DP Top-Down') {

    } else {
        alert("No se selecciono ningun algoritmo")
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
    nuevo_valor.innerHTML = `<input type="number" class="input-num text-center w-75" value="${val}" min="1" name="array[]" oninput='verificarValor(${indx})'>
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

function removerRestos(){

    /*------------------LIMPIAMOS LO CORRESPONDIENTE A FUERZA BRUTA--------------------*/
    // Eliminamos todas las cajas referentes a los nodos del árbol
    const niveles = document.querySelectorAll('.animacion-brute-force .level');
    niveles.forEach((nivel, indice) => {
        while(nivel.firstChild){
            nivel.removeChild(nivel.firstChild);
        }
        for(let i = 0; i < Math.pow(2, indice); i++){
            const nodo = document.createElement('div');
            nodo.classList.add('nodo');
            nodo.dataset.id = "0";
            nivel.appendChild(nodo);
        }
    });

    // Limpiamos el canvas
    const panel_animado = document.querySelector("#panel-animado");
    const context = panel_animado.getContext('2d');
    context.clearRect(0, 0, panel_animado.width, panel_animado.height);
    
    // Quitamos todos los paneles que hagan referencia a fuerza bruta
    const paneles_fuerza_bruta = document.querySelectorAll('.animacion-brute-force');
    paneles_fuerza_bruta.forEach(panel => {
        panel.classList.add('d-none');
    });

    /*------------------LIMPIAMOS LO CORRESPONDIENTE A BOTTOM-UP--------------------*/
    // Eliminamos todas las cajas referentes a la tabla
    const tabla = document.querySelector('.animacion-bottom-up .tabla-wrapper');
    while(tabla.firstChild){
        tabla.removeChild(tabla.firstChild);
    }

    // Quitamos todos los paneles que hagan referencia a bottom-up
    const paneles_bottom_up = document.querySelectorAll('.animacion-bottom-up');
    paneles_bottom_up.forEach(panel => {
        panel.classList.add('d-none');
    });

}

/*--------------------------------VALIDACIÓN DE DATOS------------------------------*/
const verifSuma = document.getElementById("sum-v");
verifSuma.addEventListener('input', function(event) {
    var test = showErrorV();
    if (test) {
        btn_guardar.disabled = true;
        showErrorV();
    } else {
        btn_guardar.disabled = false;
        errorD.innerHTML = '';
        errorD.className = 'd-flex justify-content-end';
    }
});

function showErrorV() {
    if (verifSuma.value.length === 0 || verifSuma.value < 0 || verifSuma.value == null) {
        errorD.textContent = 'Verificar datos ingresados';
        errorD.className = 'd-flex justify-content-end error active ';
        return true;
    }
    return false;
}

window.verificarValor = (id) => { // La hacemos global para el html
    const elemento = document.querySelector(`div[data-indx="${id}"] input`);
    var test = showError(elemento);

    if (test) {
        btn_guardar.disabled = true;
        showError(elemento);
    } else {
        btn_guardar.disabled = false;
        errorD.innerHTML = '';
        errorD.className = 'd-flex justify-content-end';
    }
}

function showError(elemento) {
    if (elemento.length === 0 || elemento.value < 0 || elemento.value == null) {
        errorD.textContent = 'Verificar datos ingresados';
        errorD.className = 'd-flex justify-content-end error active ';
        return true;
    }
    return false;
}