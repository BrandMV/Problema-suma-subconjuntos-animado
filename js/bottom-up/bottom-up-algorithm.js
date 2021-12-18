/*--------------------------------Importamos módulos escenciales-----------------------------*/
import {
    UI,
    Tabla
} from './bottom-up-animation.js';

/*----------------------------------Variables/constantes principales---------------------------*/
// Constante para el botón de avanzar
const btn_avanzar = document.querySelector('#btn-avanzar');
// Constante para el botón de simular
const btn_simular = document.querySelector('#btn-simular');
// Constante para el botom de detener
const btn_detener = document.querySelector('#btn-detener');

export let tabla; // Tabla lógica
export let ui; // Representación de la interfaz

let retardo; // Retardo para la animación automática
let detener = false; // Variable para detectar cuando se detiene el algoritmo

/**
 * Función que ejecuta los algoritmos paso por paso o automático según sea el caso
 * @param {Objeto{algoritmo, valores, suma, tipo_animacion, velocidad}} configs Objeto que contiene todas las configuraciones del algoritmo 
 */
export async function main(configs) {
    /*--------------------------------Preparación de variables-----------------------------*/
    detener = false; // Reiniciamos la detención
    tabla = new Tabla() // Creamos la tabla lógica
    ui = new UI(); // Iniciamos la interfaz

    // Establecemos las tablas en los objetos
    tabla.establecerTabla(configs.valores, configs.suma);
    ui.establecerTabla(tabla);

    // Obtenemos el tiempo de retardo
    retardo = configs.velocidad * 1000 / 10;

    // Declaramos la variable de resultado
    let resultado = false;

    // Agregamos el listener para detener la ejecución
    btn_detener.addEventListener("click", actionTerminar);

    /*--------------------------Ejecución del algoritmo según sea el tipo-----------------------*/
    if (configs.tipo_animacion === "PXP") // Si es paso por paso 
        resultado = await esSumaConjuntoPXP(configs.valores, configs.valores.length, configs.suma);
    else // Si es automático
        resultado = await esSumaConjunto(configs.valores, configs.valores.length, configs.suma);
        
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
        tabla.establecerResultadoFinal("bg-success");
    } else {
        tabla.establecerResultadoFinal("bg-danger");
        ui.mostrarPaso(`No se completó la suma ): intenta de nuevo.`);
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
 * @returns {boolean} Resultado de esa llamada de encontrar o no la suma
 */
async function esSumaConjunto(set, n, sum) {
    // CREANDO LA TABLA
    let subconjunto = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        subconjunto[i] = new Array(sum + 1);
        for (let j = 0; j <= sum; j++) {
            subconjunto[i][j] = false;
        }
    }

    /*----Comprobando detención----*/
    if (detener) return;

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(4);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Colocamos True donde la suma da 0.`);
    /*--------Retardo--------*/
    await sleep(retardo);

    /*----Comprobando detención----*/
    if (detener) return;

    // SI LA SUMA A BUSCAR ES 0, SE REGRESA TRUE
    for (let i = 0; i <= n; i++) {
        /*----Comprobando detención----*/
        if (detener) return;

        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        /*--------Retardo--------*/
        await sleep(retardo / (2 * n));

        /*----Comprobando detención----*/
        if (detener) return;

        subconjunto[i][0] = true;

        /*----------Manejo de tabla----------*/
        tabla.generarCelda(i, 0);
        tabla.establecerResultado(i, 0, true);
        tabla.limpiarIndices(i, 0);

        /*----Manejo de linea----*/
        ui.destacarInstruccion(5);
        /*--------Retardo--------*/
        await sleep(retardo / (2 * n));

        /*----Comprobando detención----*/
        if (detener) return;
    }

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(6);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Colocamos False donde n sea 0.`);
    /*--------Retardo--------*/
    await sleep(retardo);

    /*----Comprobando detención----*/
    if (detener) return;

    // SI LA SUMA NO ES 0, PERO EL CONJUNTO ES VACÍO, SE REGRESA FALSE
    for (let j = 1; j <= sum; j++) {
        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        /*--------Retardo--------*/
        await sleep(retardo / (2 * sum));

        /*----Comprobando detención----*/
        if (detener) return;

        subconjunto[0][j] = false;

        /*----------Manejo de tabla----------*/
        tabla.generarCelda(0, j);
        tabla.establecerResultado(0, j, false);
        tabla.limpiarIndices(0, j);

        /*----Manejo de linea----*/
        ui.destacarInstruccion(7);
        /*--------Retardo--------*/
        await sleep(retardo / (2 * sum));

        /*----Comprobando detención----*/
        if (detener) return;
    }

    // SE LLENA LA TABLA RECORRIENDO LA SUMA Y LOS ELEMENTOS DEL CONJUNTO

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(8);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Recorremos cada fila de la tabla.`);
    /*--------Retardo--------*/
    await sleep(retardo);

    /*----Comprobando detención----*/
    if (detener) return;

    for (let i = 1; i <= n; i++) {

        /*----Comprobando detención----*/
        if (detener) return;

        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(9);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Recorremos cada columna de la fila.`);
        /*--------Retardo--------*/
        await sleep(retardo);

        /*----Comprobando detención----*/
        if (detener) return;


        for (let j = 1; j <= sum; j++) {

            /*----Comprobando detención----*/
            if (detener) return;

            /*----Manejo de linea----*/
            ui.limpiarInstrucciones();
            ui.destacarInstruccion(10);
            /*----Manejo de paso----*/
            ui.mostrarPaso(`Comprobando si el elemento (${set[n - 1]}) es mayor a la suma (${j})...`);
            /*----------Manejo de tabla----------*/
            tabla.generarCelda(i, j);
            /*--------Retardo--------*/
            await sleep(retardo);

            /*----Comprobando detención----*/
            if (detener) return;

            // SI EL ELEMENTO ACTUAL ES MAYOR AL VALOR ACTUAL DE LA SUMA
            if (set[i - 1] > j) {

                /*----Manejo de linea----*/
                ui.limpiarInstrucciones();
                ui.destacarInstruccion(11);
                /*----Manejo de paso----*/
                ui.mostrarPaso(`Sí es mayor, copiamos el resultado de arriba.`);

                /*----------Manejo de tabla----------*/
                tabla.copiarNumero(i, j);
                /*--------Retardo--------*/
                await sleep(retardo);
                /*----------Manejo de tabla----------*/
                tabla.limpiarCopiado(i, j);

                subconjunto[i][j] = subconjunto[i - 1][j];

                /*----Comprobando detención----*/
                if (detener) return;
            }

            /*----Manejo de linea----*/
            ui.limpiarInstrucciones();
            ui.destacarInstruccion(12);
            /*----Manejo de paso----*/
            ui.mostrarPaso(`Comprobando que se pueda tomar el elemento (${set[n - 1]}) &le; (${j})...`);
            /*--------Retardo--------*/
            await sleep(retardo);

            /*----Comprobando detención----*/
            if (detener) return;

            // SI EL VALOR ACTUAL SE LA SUMA ES MAYOR QUE EL IESIMO ELEMENTO
            if (j >= set[i - 1]) {

                /*----Manejo de linea----*/
                ui.limpiarInstrucciones();
                ui.destacarInstruccion(13);
                ui.destacarInstruccion(14);
                /*----Manejo de paso----*/
                ui.mostrarPaso(`Sí se puede tomar, comprobando si tomando/no tomando obtenemos la suma...`);
                /*----------Manejo de tabla----------*/
                tabla.comparar(i, j, set[i - 1]);
                /*--------Retardo--------*/
                await sleep(retardo);

                /*----------Manejo de tabla----------*/
                tabla.limpiarComparacion(i, j, set[i - 1]);
                subconjunto[i][j] = subconjunto[i - 1][j] || subconjunto[i - 1][j - set[i - 1]];

                /*----Comprobando detención----*/
                if (detener) return;
            }


            /*----Manejo de paso----*/
            if (subconjunto[i][j]) {
                ui.mostrarPaso(`Sí se puedo obtener la suma en esa celda.`);
            } else {
                ui.mostrarPaso(`No se puedo obtener la suma en esa celda.`);
            }
            tabla.establecerResultado(i, j, subconjunto[i][j]);

            /*--------Retardo--------*/
            await sleep(retardo);

            tabla.limpiarIndices(i, j);

            /*----Comprobando detención----*/
            if (detener) return;
        }
    }

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(15);
    /*--------Retardo--------*/
    await sleep(retardo);

    return subconjunto[n][sum]
}

/**
 * Función síncrona del algortimo solución al problema de la suma de un conjunto de números
 * que funciona de manera automática por medio de la escucha de un click, también encargada
 * de mandar a mostrar la información del algoritmo en el DOM
 * @param {Array[int]} set Arreglo de números con los que trabajará el algoritmo
 * @param {int} n Número de elementos del arreglo que aún quedan por analizar
 * @param {int} sum Suma que se debe cumplir en esa llamada del algoritmo 
 * @returns {boolean} Resultado de esa llamada de encontrar o no la suma
 */
async function esSumaConjuntoPXP(set, n, sum) {
    // CREANDO LA TABLA
    let subconjunto = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        subconjunto[i] = new Array(sum + 1);
        for (let j = 0; j <= sum; j++) {
            subconjunto[i][j] = false;
        }
    }

    /*----Comprobando detención----*/
    if (detener) return;

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(4);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Colocamos True donde la suma da 0.`);
    /*--------Espera--------*/
    await esperarClick();

    /*----Comprobando detención----*/
    if (detener) return;

    // SI LA SUMA A BUSCAR ES 0, SE REGRESA TRUE
    for (let i = 0; i <= n; i++) {
        /*----Comprobando detención----*/
        if (detener) return;

        /*----Comprobando detención----*/
        if (detener) return;

        subconjunto[i][0] = true;

        /*----------Manejo de tabla----------*/
        tabla.generarCelda(i, 0);
        tabla.establecerResultado(i, 0, true);
        tabla.limpiarIndices(i, 0);

        /*----Comprobando detención----*/
        if (detener) return;
    }

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(6);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Colocamos False donde n sea 0.`);
    /*--------Espera--------*/
    await esperarClick();

    /*----Comprobando detención----*/
    if (detener) return;

    // SI LA SUMA NO ES 0, PERO EL CONJUNTO ES VACÍO, SE REGRESA FALSE
    for (let j = 1; j <= sum; j++) {
        /*----Comprobando detención----*/
        if (detener) return;

        subconjunto[0][j] = false;

        /*----------Manejo de tabla----------*/
        tabla.generarCelda(0, j);
        tabla.establecerResultado(0, j, false);
        tabla.limpiarIndices(0, j);

        /*----Comprobando detención----*/
        if (detener) return;
    }

    // SE LLENA LA TABLA RECORRIENDO LA SUMA Y LOS ELEMENTOS DEL CONJUNTO

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(8);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Recorremos cada fila de la tabla.`);
    /*--------Espera--------*/
    await esperarClick();

    /*----Comprobando detención----*/
    if (detener) return;

    for (let i = 1; i <= n; i++) {

        /*----Comprobando detención----*/
        if (detener) return;

        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(9);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Recorremos cada columna de la fila.`);
        /*--------Espera--------*/
        await esperarClick();

        /*----Comprobando detención----*/
        if (detener) return;


        for (let j = 1; j <= sum; j++) {

            /*----Comprobando detención----*/
            if (detener) return;

            /*----Manejo de linea----*/
            ui.limpiarInstrucciones();
            ui.destacarInstruccion(10);
            /*----Manejo de paso----*/
            ui.mostrarPaso(`Comprobando si el elemento (${set[n - 1]}) es mayor a la suma (${j})...`);
            /*----------Manejo de tabla----------*/
            tabla.generarCelda(i, j);
            /*--------Espera--------*/
            await esperarClick();

            /*----Comprobando detención----*/
            if (detener) return;

            // SI EL ELEMENTO ACTUAL ES MAYOR AL VALOR ACTUAL DE LA SUMA
            if (set[i - 1] > j) {

                /*----Manejo de linea----*/
                ui.limpiarInstrucciones();
                ui.destacarInstruccion(11);
                /*----Manejo de paso----*/
                ui.mostrarPaso(`Sí es mayor, copiamos el resultado de arriba.`);

                /*----------Manejo de tabla----------*/
                tabla.copiarNumero(i, j);
                /*--------Espera--------*/
                await esperarClick();
                /*----------Manejo de tabla----------*/
                tabla.limpiarCopiado(i, j);

                subconjunto[i][j] = subconjunto[i - 1][j];

                /*----Comprobando detención----*/
                if (detener) return;
            }

            /*----Manejo de linea----*/
            ui.limpiarInstrucciones();
            ui.destacarInstruccion(12);
            /*----Manejo de paso----*/
            ui.mostrarPaso(`Comprobando que se pueda tomar el elemento (${set[n - 1]}) &le; (${j})...`);
            /*--------Espera--------*/
            await esperarClick();

            /*----Comprobando detención----*/
            if (detener) return;

            // SI EL VALOR ACTUAL SE LA SUMA ES MAYOR QUE EL IESIMO ELEMENTO
            if (j >= set[i - 1]) {

                /*----Manejo de linea----*/
                ui.limpiarInstrucciones();
                ui.destacarInstruccion(13);
                ui.destacarInstruccion(14);
                /*----Manejo de paso----*/
                ui.mostrarPaso(`Sí se puede tomar, comprobando si tomando/no tomando obtenemos la suma...`);
                /*----------Manejo de tabla----------*/
                tabla.comparar(i, j, set[i - 1]);
                /*--------Espera--------*/
                await esperarClick();

                /*----------Manejo de tabla----------*/
                tabla.limpiarComparacion(i, j, set[i - 1]);
                subconjunto[i][j] = subconjunto[i - 1][j] || subconjunto[i - 1][j - set[i - 1]];

                /*----Comprobando detención----*/
                if (detener) return;
            }


            /*----Manejo de paso----*/
            if (subconjunto[i][j]) {
                ui.mostrarPaso(`Sí se pudo obtener la suma en esa celda.`);
            } else {
                ui.mostrarPaso(`No se pudo obtener la suma en esa celda.`);
            }
            tabla.establecerResultado(i, j, subconjunto[i][j]);

            /*--------Espera--------*/
            await esperarClick();

            /*----------Manejo de tabla----------*/
            tabla.limpiarIndices(i, j);

            /*----Comprobando detención----*/
            if (detener) return;
        }
    }

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(15);
    ui.mostrarPaso(`Comprobando resultado final...`);
    /*--------Espera--------*/
    await esperarClick();

    return subconjunto[n][sum]
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