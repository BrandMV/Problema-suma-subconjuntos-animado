/*****************************************************************
	Archivo de algoritmo fuerza bruta
	Este programa se encarga de ejecutar el algoritmo de solución
    por fuerza bruto y mientras lo hace, muestra el paso a paso
    de la solución tanto en el panel visible de animación como en
    el panel de pasos y el pseudocódigo. También implementa
    las funcionalidades de los botones de avanzar, simular y
    detener.
	
    Fecha: 20/12/2021
	Version: Final 1.0 
	Autores:
			-Martinez Ruiz Alfredo
			-Mendez Castañeda Aurora
			-Mendez Hipolito Emilio
			-Meza Vargas Brandon David

*****************************************************************/

/*--------------------------------Importamos módulos escenciales-----------------------------*/
import {
    UI,
    Arbol,
    agregarNodo
} from './brute-force-animation.js';

/*----------------------------------Variables/constantes principales---------------------------*/
// Constante para el botón de avanzar
const btn_avanzar = document.querySelector('#btn-avanzar');
// Constante para el botón de simular
const btn_simular = document.querySelector('#btn-simular');
// Constante para el botom de detener
const btn_detener = document.querySelector('#btn-detener');

// Inicializamos el canvas
export let ui;

// Declaramos las variables a usar  
export let root; // Variable que apunta a la raíz del árbol lógico
let retardo; // Variable que determina el timpo de retarde entre cada paso
let id; // Variable que almacena el id de cada llamada a función 
export let apuntadores_nivel; // Variable que almacena los apuntadores de cada nivel
let detener = false; // Variable para detectar cuando se detiene el algoritmo

/**
 * Función que ejecuta los algoritmos paso por paso o automático según sea el caso
 * @param {Objeto{algoritmo, valores, suma, tipo_animacion, velocidad}} configs Objeto que contiene todas las configuraciones del algoritmo 
 */
export async function main(configs) {
    /*--------------------------------Preparación de variables-----------------------------*/
    detener = false; // Reiniciamos la detención
    // Inizalizamos el apuntador de nivel y los id's
    apuntadores_nivel = {
        "0": 1,
        "1": 2,
        "2": 4,
        "3": 8,
        "4": 16,
    }
    id = 1;
    
    // Creamos el nodo raiz y lo mostramos
    root = new Arbol("", 0, "(" + configs.valores.length + "," + configs.suma + ")", 0);
    // Creamos el nodo raiz e inicializamos el canvas
    ui = new UI();

    ui.mostrarNodo(root);

   

    // Obtenemos el tiempo de retardo
    retardo = configs.velocidad * 1000 / 10;

    // Declaramos la variable de resultado
    let resultado = false;

    // Agregamos el listener para detener la ejecución
    btn_detener.addEventListener("click", actionTerminar);

    /*--------------------------Ejecución del algoritmo según sea el tipo-----------------------*/
    if (configs.tipo_animacion === "PXP") // Si es paso por paso 
        resultado = await esSumaConjuntoPXP(configs.valores, configs.valores.length, configs.suma, root);
    else // Si es automático
        resultado = await esSumaConjunto(configs.valores, configs.valores.length, configs.suma, root);

    /*------------------------------------Comprobando detención---------------------------------*/
    if(detener){
        ui.mostrarPaso("Terminado");
        btn_detener.disabled = true;
        btn_simular.disabled = false;
        btn_detener.removeEventListener("click", actionTerminar);
        return;
    }

    /*----------------------------Mostrando el resultado del algoritmo----------------------------*/
    if (resultado) {
        ui.mostrarPaso(`Se completó la suma señores B) mi trabajo aquí ha terminado.`);
        root.establecerResultadoFinal("bg-success");
    } else {
        ui.mostrarPaso(`No se completó la suma ): intenta de nuevo.`);
        root.establecerResultadoFinal("bg-danger");
    }
    btn_detener.disabled = true;
    btn_simular.disabled = false;
    btn_detener.removeEventListener("click", actionTerminar);
}

/**
 * Función síncrona del algortimo solución al problema de la suma de un conjunto de números
 * que funciona de manera automática por medio de un retardo, también encargada de mandar
 * a mostrar la información del algoritmo en el DOM
 * @param {Array[int]} set Arreglo de números con los que trabajará el algoritmo
 * @param {int} n Número de elementos del arreglo que aún quedan por analizar
 * @param {int} sum Suma que se debe cumplir en esa llamada del algoritmo 
 * @param {Arbol} nodo Nodo del árbol lógico en el que está trabajando el algoritmo
 * @returns {boolean} Resultado de esa llamada de encontrar o no la suma
 */
async function esSumaConjunto(set, n, sum, nodo) {
    let resultado;

    /*----Comprobando detención----*/
    if(detener) return;

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(1);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Nueva llamada con a: [${set}], n: ${n} y sum: ${sum}.`);
    /*--------Retardo--------*/
    await sleep(retardo);
    
    /*----Comprobando detención----*/
    if(detener) return;

    // SI SE COMPLETÓ LA SUMA DEL ALGORITMO

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(2);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Comprobando si se completó la suma...`);
    /*--------Retardo--------*/
    await sleep(retardo);
    
    /*----Comprobando detención----*/
    if(detener) return;

    if (sum == 0) {
        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, true);

        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(3);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Se completó la suma. :)`);
        /*--------Retardo--------*/
        await sleep(retardo);
        
        /*----Comprobando detención----*/
        if(detener) return;

        return true;
    }

    // SI YA NO HAY MÁS ELEMENTOS EN EL CONJUNTO

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(4);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Comprobando si aún quedan elementos por comparar...`);
    /*--------Retardo--------*/
    await sleep(retardo);
    
    /*----Comprobando detención----*/
    if(detener) return;

    if (sum < 0 || (n == 0 && sum != 0)) {
        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(5);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Ya no quedan más elementos. :(`);

        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, false);

        /*--------Retardo--------*/
        await sleep(retardo);
        
        /*----Comprobando detención----*/
        if(detener) return;

        return false;
    }

    // SI EL ELEMENTO ACTUAL ES MAYOR A LA SUMA
    
    /*----Comprobando detención----*/
    if(detener) return;

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(6);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Comprobando si el elemento (${set[n - 1]}) es mayor a la suma (${sum})...`);
    /*--------Retardo--------*/
    await sleep(retardo);

    /*----Comprobando detención----*/
    if(detener) return;

    if (set[n - 1] > sum) {
        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(7);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Si es mayor, omitimos tomar el elemento actual.`);
        /*--------Retardo--------*/
        await sleep(retardo);
        
        /*----Comprobando detención----*/
        if(detener) return;
        
        /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
        id++;
        const nodo_der = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + sum + ")", "der"); // Agregamos el nodo
        resultado = await esSumaConjunto(set, n - 1, sum, nodo_der); // Esperamos la llamada recursiva
        
        /*----Comprobando detención----*/
        if(detener) return;

        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, resultado);
        ui.saltarEspHorizontal(nodo_der); // Saltamos una posición horizontal (el cuadro izquierdo que no ocupamos)

        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(7);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Devolvemos el resultado de no tomarlo (${resultado}).`);
        /*--------Retardo--------*/
        await sleep(retardo);
        
        /*----Comprobando detención----*/
        if(detener) return;

        return resultado;
    }

    // CONSIDERANDO NO TOMAR EL ELEMENTO ACTUAL

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(8);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Identificando qué sucede si no tomamos el elemento actual (${set[n - 1]})...`);
    /*--------Retardo--------*/
    await sleep(retardo);
    
    /*----Comprobando detención----*/
    if(detener) return;

    /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
    id++;
    const nodo_der = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + sum + ")", "der"); // Agregamos el nodo
    resultado = await esSumaConjunto(set, n - 1, sum, nodo_der); // Esperamos la llamada recursiva
    
    /*----Comprobando detención----*/
    if(detener) return;

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(8);
    /*--------Retardo--------*/
    await sleep(retardo);
    
    /*----Comprobando detención----*/
    if(detener) return;

    if (resultado) {
        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, resultado);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Devolviendo el resultado de no tomarlo (${resultado}).`);
        /*--------Retardo--------*/
        await sleep(retardo);
        
        /*----Comprobando detención----*/
        if(detener) return;

        return resultado;
    }

    // SI NO TOMAMOS EL ELEMENTO ACTUAL Y DA FALSO, MANDAMO+S A TOMAR EL ELEMENTO ACTUAL
    else {
        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(9);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`No tenemos la suma, consideramos tomar al elemento actual (${set[n - 1]}).`);
        /*--------Retardo--------*/
        await sleep(retardo);
        
        /*----Comprobando detención----*/
        if(detener) return;

        /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
        id++;
        const nodo_izq = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + (sum - set[n - 1]) + ")", "izq"); // Agregamos el nodo
        resultado = await esSumaConjunto(set, n - 1, sum - set[n - 1], nodo_izq) // Esperamos la llamada recursiva
        
        /*----Comprobando detención----*/
        if(detener) return;

        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, resultado);

        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(9);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Devolviendo el resultado de tomarlo (${resultado})...`);
        /*--------Retardo--------*/
        await sleep(retardo);
        
        /*----Comprobando detención----*/
        if(detener) return;

        return resultado;
    }
}

/**
 * Función síncrona del algortimo solución al problema de la suma de un conjunto de números
 * que funciona de manera automática por medio de la escucha de un click, también encargada
 * de mandar a mostrar la información del algoritmo en el DOM
 * @param {Array[int]} set Arreglo de números con los que trabajará el algoritmo
 * @param {int} n Número de elementos del arreglo que aún quedan por analizar
 * @param {int} sum Suma que se debe cumplir en esa llamada del algoritmo 
 * @param {Arbol} nodo Nodo del árbol lógico en el que está trabajando el algoritmo
 * @returns {boolean} Resultado de esa llamada de encontrar o no la suma
 */
async function esSumaConjuntoPXP(set, n, sum, nodo) {
    let resultado;

    /*----Comprobando detención----*/
    if(detener) return;

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(1);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Nueva llamada con a: [${set}], n: ${n} y sum: ${sum}.`);
    /*--------Espera--------*/
    await esperarClick();

    /*----Comprobando detención----*/
    if(detener) return;

    // SI SE COMPLETÓ LA SUMA DEL ALGORITMO

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(2);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Comprobando si se completó la suma...`);
    /*--------Espera--------*/
    await esperarClick();

    /*----Comprobando detención----*/
    if(detener) return;

    if (sum == 0) {
        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, true);

        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(3);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Se completó la suma. :)`);
        /*--------Espera--------*/
        await esperarClick();

        /*----Comprobando detención----*/
        if(detener) return;

        return true;
    }

    // SI YA NO HAY MÁS ELEMENTOS EN EL CONJUNTO

    /*----Comprobando detención----*/
    if(detener) return;

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(4);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Comprobando si aún quedan elementos por comparar...`);
    /*--------Espera--------*/
    await esperarClick();

    /*----Comprobando detención----*/
    if(detener) return;

    if (sum < 0 || (n == 0 && sum != 0)) {
        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(5);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Ya no quedan más elementos. :(`);

        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, false);

        /*--------Espera--------*/
        await esperarClick();

        /*----Comprobando detención----*/
        if(detener) return;

        return false;
    }

    // SI EL ELEMENTO ACTUAL ES MAYOR A LA SUMA

    /*----Comprobando detención----*/
    if(detener) return;

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(6);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Comprobando si el elemento (${set[n - 1]}) es mayor a la suma (${sum})...`);
    /*--------Espera--------*/
    await esperarClick();

    /*----Comprobando detención----*/
    if(detener) return;

    if (set[n - 1] > sum) {
        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(7);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Si es mayor, omitimos tomar el elemento actual.`);
        /*--------Espera--------*/
        await esperarClick();
        
        /*----Comprobando detención----*/
        if(detener) return;

        /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
        id++;
        const nodo_der = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + sum + ")", "der"); // Agregamos el nodo
        resultado = await esSumaConjuntoPXP(set, n - 1, sum, nodo_der); // Esperamos la llamada recursiva

        /*----Comprobando detención----*/
        if(detener) return;

        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, resultado);
        ui.saltarEspHorizontal(nodo_der); // Saltamos una posición horizontal (el cuadro izquierdo que no ocupamos)

        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(7);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Devolvemos el resultado de no tomarlo (${resultado}).`);
        /*--------Espera--------*/
        await esperarClick();

        /*----Comprobando detención----*/
        if(detener) return;

        return resultado;
    }

    // CONSIDERANDO NO TOMAR EL ELEMENTO ACTUAL

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(8);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Identificando qué sucede si no tomamos el elemento actual (${set[n - 1]})...`);
    /*--------Espera--------*/
    await esperarClick();

    /*----Comprobando detención----*/
    if(detener) return;

    /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
    id++;
    const nodo_der = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + sum + ")", "der"); // Agregamos el nodo
    resultado = await esSumaConjuntoPXP(set, n - 1, sum, nodo_der); // Esperamos la llamada recursiva

    /*----Comprobando detención----*/
    if(detener) return;

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(8);
    /*--------Espera--------*/
    await esperarClick();

    /*----Comprobando detención----*/
    if(detener) return;

    if (resultado) {
        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, resultado);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Devolviendo el resultado de no tomarlo (${resultado}).`);
        /*--------Espera--------*/
        await esperarClick();

        /*----Comprobando detención----*/
        if(detener) return;

        return resultado;
    }

    // SI NO TOMAMOS EL ELEMENTO ACTUAL Y DA FALSO, MANDAMO+S A TOMAR EL ELEMENTO ACTUAL
    else {
        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(9);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`No tenemos la suma, consideramos tomar al elemento actual (${set[n - 1]}).`);
        /*--------Espera--------*/
        await esperarClick();

        /*----Comprobando detención----*/
        if(detener) return;

        /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
        id++;
        const nodo_izq = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + (sum - set[n - 1]) + ")", "izq"); // Agregamos el nodo
        resultado = await esSumaConjuntoPXP(set, n - 1, sum - set[n - 1], nodo_izq) // Esperamos la llamada recursiva

        /*----Comprobando detención----*/
        if(detener) return;

        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, resultado);

        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(9);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Devolviendo el resultado de tomarlo (${resultado})...`);
        /*--------Espera--------*/
        await esperarClick();

        /*----Comprobando detención----*/
        if(detener) return;

        return resultado;
    }
}

/**
 * Función encargarda de restardar una función síncrona
 * @param {long} ms Tiempo en milisegundos del retardo
 * @returns {promise} Promesa para cuando finalice el retardo
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Función encargada de retardar una función síncrona hasta que el click en un elemento
 * lo determine.
 * @returns {promise} Promesa para cuando se detecte el click en el elemento html
 */
function esperarClick() {
    return new Promise(resolve => {
        btn_avanzar.addEventListener("click", resolve);
        btn_detener.addEventListener("click", resolve);
    });
}

/**
 * Listener para el botón de detener que modifica el paso y la variable detener
*/
function actionTerminar() {
    ui.mostrarPaso(`Terminando...`);
    detener = true;
}