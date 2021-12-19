/*--------------------------------Importamos módulos escenciales-----------------------------*/
import {
    UI,
    Arbol,
    agregarNodo
} from './top-down-animation.js';

/*----------------------------------Variables/constantes principales---------------------------*/
// Constante para el botón de avanzar
const btn_avanzar = document.querySelector('#btn-avanzar');
// Constante para el botón de simular
const btn_simular = document.querySelector('#btn-simular');
// Constante para el botom de detener
const btn_detener = document.querySelector('#btn-detener');

// Inicializamos el canvas
export let ui;

export let mostrar = true;

// Declaramos las variables a usar  
export var root; // Variable que apunta a la raíz del árbol lógico
let retardo; // Variable que determina el timpo de retarde entre cada paso
let id; // Variable que almacena el id de cada llamada a función 
export let apuntadores_nivel; // Variable que almacena los apuntadores de cada nivel
let detener = false; // Variable para detectar cuando se detiene el algoritmo
let tab;


/**
 * Función que ejecuta los algoritmos paso por paso o automático según sea el caso
 * @param {Objeto{algoritmo, valores, suma, tipo_animacion, velocidad}} configs Objeto que contiene todas las configuraciones del algoritmo 
 */
export async function main(configs) {
    /*--------------------------------Preparación de variables-----------------------------*/
    detener = false; // Reiniciamos la detención
    mostrar = true; // Reiniciamos la muestra para todos los nodos

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
    inicializarTabla(configs.valores.length, configs.suma);

    resultado = await esSumaConjunto(configs.valores, configs.valores.length, configs.suma, root, configs.tipo_animacion);


    // if (configs.tipo_animacion === "PXP") // Si es paso por paso 
    //     resultado = await esSumaConjuntoPXP(configs.valores, configs.valores.length, configs.suma, root);
    // else // Si es automático
    //     resultado = await esSumaConjunto(configs.valores, configs.valores.length, configs.suma, root);

    tab[configs.valores.length][configs.suma] = resultado;
    ui.mostrarCalculados(tab);

    /*------------------------------------Comprobando detención---------------------------------*/
    if (detener) {
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
async function esSumaConjunto(set, n, sum, nodo, modo) {
    const mostrar_prev = mostrar;

    let resultado;

    /*----Comprobando detención----*/
    if (detener) return;

    /*----Manejo de linea----*/
    await descatarInstruccionPaso(1, `Nueva llamada con a: [${set}], n: ${n} y sum: ${sum}.`, modo);

    /*----Comprobando detención----*/
    if (detener) return;

    // SI SE COMPLETÓ LA SUMA DEL ALGORITMO
    /*----Manejo de linea----*/
    await descatarInstruccionPaso(2, `Comprobando si se completó la suma...`, modo);

    /*----Comprobando detención----*/
    if (detener) return;

    if (sum == 0) {
        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, true);

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(3, `Se completó la suma. :)`, modo);

        /*----Comprobando detención----*/
        if (detener) return;
        return true;
    }

    // SI YA NO HAY MÁS ELEMENTOS EN EL CONJUNTO

    /*----Manejo de linea----*/
    await descatarInstruccionPaso(4, `Comprobando si aún quedan elementos por comparar...`, modo);

    /*----Comprobando detención----*/
    if (detener) return;

    if (sum < 0 || (n == 0 && sum != 0)) {
        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, false);

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(5, `Ya no quedan más elementos. :(`, modo);

        /*----Comprobando detención----*/
        if (detener) return;

        return false;
    }

    // SI LA RAMA DERECHA NO HA SIDO CALCULADA

    /*----Comprobando detención----*/
    if (detener) return;

    /*----Manejo de linea----*/
    await descatarInstruccionPaso(6, `Comprobando si la rama derecha ya fue calculada...`, modo);

    if (tab[n - 1][sum] == null) {
        /*----Comprobando detención----*/
        if (detener) return;

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(7, `No ha sido calculada, la calculamos...`, modo);

        /*----Comprobando detención----*/
        if (detener) return;

        /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
        id++;
        const nodo_der = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + sum + ")", "der"); // Agregamos el nodo
        resultado = await esSumaConjunto(set, n - 1, sum, nodo_der, modo); // Esperamos la llamada recursiva

        /*----Comprobando detención----*/
        if (detener) return;

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(7, `Asignamos el valor devuelvo a la tabla.`, modo);

        tab[n - 1][sum] = resultado;
        ui.mostrarCalculados(tab);
    } 
    else{
        mostrar = false;
        /*----Comprobando detención----*/
        if (detener) return;

        /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
        id++;
        const nodo_der = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + sum + ")", "der"); // Agregamos el nodo
        resultado = await esSumaConjunto(set, n - 1, sum, nodo_der, modo); // Esperamos la llamada recursiva
        if(mostrar_prev) mostrar = true;
    }

    // SI EL ELEMENTO ACTUAL ES MAYOR A LA SUMA

    /*----Comprobando detención----*/
    if (detener) return;

    /*----Manejo de linea----*/
    await descatarInstruccionPaso(8, `Comprobando si el elemento (${set[n - 1]}) es mayor a la suma (${sum})...`, modo);

    /*----Comprobando detención----*/
    if (detener) return;

    if (set[n - 1] > sum) {
        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, tab[n - 1][sum]);
        ui.saltarEspHorizontal(nodo.derecho); // Saltamos una posición horizontal (el cuadro izquierdo que no ocupamos)

        /*----Comprobando detención----*/
        if (detener) return;

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(9, `Sí es mayor, devolvemos el resultado de no tomarlo (${resultado}).`, modo);

        /*----Comprobando detención----*/
        if (detener) return;

        return tab[n - 1][sum];
    }

    /*----Comprobando detención----*/
    if (detener) return;

    /*----Manejo de linea----*/
    await descatarInstruccionPaso(10, `Identificando qué sucede si no tomamos el elemento actual (${set[n - 1]})...`, modo);

    /*----Comprobando detención----*/
    if (detener) return;


    if (tab[n - 1][sum] == true) {

        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, true);

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(11, `Devolviendo el resultado de no tomarlo (${true}).`, modo);

        /*----Comprobando detención----*/
        if (detener) return;

        return true;
    }
    else {
        /*----Comprobando detención----*/
        if (detener) return;

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(13, `Comprobando si la rama derecha ya fue calculada...`, modo);

        /*----Comprobando detención----*/
        if (detener) return;

        if (tab[n - 1][sum - set[n - 1]] == null) {

            /*----Comprobando detención----*/
            if (detener) return;

            /*----Manejo de linea----*/
            await descatarInstruccionPaso(14, `No ha sido calculada, la calculamos...`, modo);

            /*----Comprobando detención----*/
            if (detener) return;

            /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
            id++;
            const nodo_izq = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + (sum - set[n - 1]) + ")", "izq"); // Agregamos el nodo
            resultado = await esSumaConjunto(set, n - 1, sum - set[n - 1], nodo_izq, modo) // Esperamos la llamada recursiva

            /*----Comprobando detención----*/
            if (detener) return;

            /*----Manejo de linea----*/
            await descatarInstruccionPaso([14, 15], `Asignamos el valor devuelvo a la tabla.`, modo);

            /*----Comprobando detención----*/
            if (detener) return;

            tab[n - 1][sum - set[n - 1]] = resultado;
            ui.mostrarCalculados(tab);
        } 
        else{
            mostrar = false;
            /*----Comprobando detención----*/
            if (detener) return;

            /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
            id++;
            const nodo_izq = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + (sum - set[n - 1]) + ")", "izq"); // Agregamos el nodo
            resultado = await esSumaConjunto(set, n - 1, sum - set[n - 1], nodo_izq, modo) // Esperamos la llamada recursiva

            if(mostrar_prev) mostrar = true;
        }
        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, tab[n - 1][sum - set[n - 1]]);

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(16, `Devolviendo el resultado de tomarlo (${true}).`, modo);

        return tab[n - 1][sum - set[n - 1]];
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
    const mostrar_prev = mostrar;

    let resultado;

    /*----Comprobando detención----*/
    if (detener) return;

    /*----Manejo de linea----*/
    await descatarInstruccionPaso(1, `Nueva llamada con a: [${set}], n: ${n} y sum: ${sum}.`, "PXP");

    /*----Comprobando detención----*/
    if (detener) return;

    // SI SE COMPLETÓ LA SUMA DEL ALGORITMO
    /*----Manejo de linea----*/
    await descatarInstruccionPaso(2, `Comprobando si se completó la suma...`, "PXP");

    /*----Comprobando detención----*/
    if (detener) return;

    if (sum == 0) {
        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, true);

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(3, `Se completó la suma. :)`, "PXP");

        /*----Comprobando detención----*/
        if (detener) return;
        return true;
    }

    // SI YA NO HAY MÁS ELEMENTOS EN EL CONJUNTO

    /*----Manejo de linea----*/
    await descatarInstruccionPaso(4, `Comprobando si aún quedan elementos por comparar...`, "PXP");

    /*----Comprobando detención----*/
    if (detener) return;

    if (sum < 0 || (n == 0 && sum != 0)) {
        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, false);

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(5, `Ya no quedan más elementos. :(`, "PXP");

        /*----Comprobando detención----*/
        if (detener) return;

        return false;
    }

    // SI LA RAMA DERECHA NO HA SIDO CALCULADA

    /*----Comprobando detención----*/
    if (detener) return;

    /*----Manejo de linea----*/
    await descatarInstruccionPaso(6, `Comprobando si la rama derecha ya fue calculada...`, "PXP");

    if (tab[n - 1][sum] == null) {
        /*----Comprobando detención----*/
        if (detener) return;

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(7, `No ha sido calculada, la calculamos...`, "PXP");

        /*----Comprobando detención----*/
        if (detener) return;

        /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
        id++;
        const nodo_der = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + sum + ")", "der"); // Agregamos el nodo
        resultado = await esSumaConjuntoPXP(set, n - 1, sum, nodo_der); // Esperamos la llamada recursiva

        /*----Comprobando detención----*/
        if (detener) return;

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(7, `Asignamos el valor devuelvo a la tabla.`, "PXP");

        tab[n - 1][sum] = resultado;
        ui.mostrarCalculados(tab);
    } 
    else{
        mostrar = false;
        /*----Comprobando detención----*/
        if (detener) return;

        /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
        id++;
        const nodo_der = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + sum + ")", "der"); // Agregamos el nodo
        resultado = await esSumaConjuntoPXP(set, n - 1, sum, nodo_der); // Esperamos la llamada recursiva
        if(mostrar_prev) mostrar = true;
    }

    // SI EL ELEMENTO ACTUAL ES MAYOR A LA SUMA

    /*----Comprobando detención----*/
    if (detener) return;

    /*----Manejo de linea----*/
    await descatarInstruccionPaso(8, `Comprobando si el elemento (${set[n - 1]}) es mayor a la suma (${sum})...`, "PXP");

    /*----Comprobando detención----*/
    if (detener) return;

    if (set[n - 1] > sum) {
        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, tab[n - 1][sum]);
        ui.saltarEspHorizontal(nodo.derecho); // Saltamos una posición horizontal (el cuadro izquierdo que no ocupamos)

        /*----Comprobando detención----*/
        if (detener) return;

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(9, `Sí es mayor, devolvemos el resultado de no tomarlo (${resultado}).`, "PXP");

        /*----Comprobando detención----*/
        if (detener) return;

        return tab[n - 1][sum];
    }

    /*----Comprobando detención----*/
    if (detener) return;

    /*----Manejo de linea----*/
    await descatarInstruccionPaso(10, `Identificando qué sucede si no tomamos el elemento actual (${set[n - 1]})...`, "PXP");

    /*----Comprobando detención----*/
    if (detener) return;


    if (tab[n - 1][sum] == true) {

        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, true);

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(11, `Devolviendo el resultado de no tomarlo (${true}).`, "PXP");

        /*----Comprobando detención----*/
        if (detener) return;

        return true;
    }
    else {
        /*----Comprobando detención----*/
        if (detener) return;

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(13, `Comprobando si la rama izquierda ya fue calculada...`, "PXP");

        /*----Comprobando detención----*/
        if (detener) return;

        if (tab[n - 1][sum - set[n - 1]] == null) {

            /*----Comprobando detención----*/
            if (detener) return;

            /*----Manejo de linea----*/
            await descatarInstruccionPaso(14, `No ha sido calculada, la calculamos...`, "PXP");

            /*----Comprobando detención----*/
            if (detener) return;

            /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
            id++;
            const nodo_izq = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + (sum - set[n - 1]) + ")", "izq"); // Agregamos el nodo
            resultado = await esSumaConjuntoPXP(set, n - 1, sum - set[n - 1], nodo_izq) // Esperamos la llamada recursiva

            /*----Comprobando detención----*/
            if (detener) return;

            /*----Manejo de linea----*/
            await descatarInstruccionPaso([14, 15], `Asignamos el valor devuelvo a la tabla.`, "PXP");

            /*----Comprobando detención----*/
            if (detener) return;

            tab[n - 1][sum - set[n - 1]] = resultado;
            ui.mostrarCalculados(tab);
        } 
        else{
            mostrar = false;
            /*----Comprobando detención----*/
            if (detener) return;

            /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
            id++;
            const nodo_izq = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + (sum - set[n - 1]) + ")", "izq"); // Agregamos el nodo
            resultado = await esSumaConjuntoPXP(set, n - 1, sum - set[n - 1], nodo_izq) // Esperamos la llamada recursiva

            if(mostrar_prev) mostrar = true;
        }
        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, tab[n - 1][sum - set[n - 1]]);

        /*----Manejo de linea----*/
        await descatarInstruccionPaso(16, `Devolviendo el resultado de tomarlo (${tab[n - 1][sum - set[n - 1]]}).`, "PXP");

        return tab[n - 1][sum - set[n - 1]];
    }
}

/**
 * 
 * @param {Array[int]} lineas Arrreglo de líneas las cuales se quieren descatar
 * @param {String} indicaciones Texto que se mostrará en el paso
 * @param {String} modo De ejecución AUTO/PXP
 */
async function descatarInstruccionPaso(lineas, indicaciones, modo) {
    // En caso de que no se trate de un array, lo convertimos
    if(Array.isArray(lineas))
        lineas = [...lineas];
    else 
        lineas = [lineas];
    

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    lineas.forEach(function(linea){
        ui.destacarInstruccion(linea);
    });
    
    /*----Manejo de paso----*/
    ui.mostrarPaso(indicaciones);

    /*----Retardo según el modo de ejecución----*/
    if(modo === "AUTO") await sleep(retardo);
    else await esperarClick();
}

function inicializarTabla(n, sum) {
    // CREANDO LA TABLA
    tab = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        tab[i] = new Array(sum + 1);
        for (let j = 0; j <= sum; j++) {
            tab[i][j] = null;
        }
    }
}

/**
 * Función encargarda de restardar una función síncrona
 * @param {long} ms Tiempo en milisegundos del retardo
 * @returns {promise} Promesa para cuando finalice el retardo
 */
function sleep(ms) {
    return new Promise(resolve => {
        if (!mostrar) // Si se está trabajando con nodos no calculados por el algoritmo
            resolve();
        else // Si los nodos sí deben ser calculados por el algoritmo
            setTimeout(resolve, ms);
    });
}

/**
 * Función encargada de retardar una función síncrona hasta que el click en un elemento
 * lo determine.
 * @returns {promise} Promesa para cuando se detecte el click en el elemento html
 */
function esperarClick() {
    return new Promise(resolve => {
        if (!mostrar) {
            resolve();
        } else {
            btn_avanzar.addEventListener("click", resolve);
            btn_detener.addEventListener("click", resolve);
        }
    });
}

/**
 * Listener para el botón de detener que modifica el paso y la variable detener
*/
function actionTerminar() {
    ui.mostrarPaso(`Terminando...`);
    detener = true;
}