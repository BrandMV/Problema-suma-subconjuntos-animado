import {
    UI,
    Arbol,
    agregarNodo
} from './brute-force-animation.js';


// Creamos el nodo raiz e inicializamos el canvas
export const ui = new UI();
export var root;
let retardo;
let id;
export let apuntadores_nivel;

export async function main(obj) {
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
    root = new Arbol("", 0, "(" + obj.valores.length + "," + obj.suma + ")", 0);
    ui.mostrarNodo(root);
    
    // Obtenemos el tiempo de retardo
    retardo = obj.velocidad * 1000;

    // Mandamos a llamar al algoritmo
    await esSumaConjunto(obj.valores, obj.valores.length, obj.suma, root);

    // Mostramos el resultado final
    root.establecerResultadoFinal();
}

// Función síncrona
async function esSumaConjunto(set, n, sum, nodo) {
    let resultado;
    await sleep(retardo); // Retardamos antes de ejecutar el algoritmo

    // Si se completó la suma del algoritmo
    if(sum == 0){
        ui.establecerResultado(nodo.id, true);
        
        await sleep(retardo); // Retardamos antes de volver al padre
        return true;
    }

    // Si ya no hay más elementos en el conjunto
    if(sum < 0 || (n == 0 && sum != 0)){
        ui.establecerResultado(nodo.id, false);

        await sleep(retardo); // Retardamos antes de volver al padre
        return false;
    }

    // Si el elemento actual es mayor a la suma
    if (set[n - 1] > sum) {
        id++;
        const nodo_der = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + sum + ")", "der"); // Agregamos el nodo
        resultado = await esSumaConjunto(set, n - 1, sum, nodo_der); // Esperamos la llamada recursiva
        ui.establecerResultado(nodo.id, resultado);
        
        ui.saltarEspHorizontal(nodo_der); // Saltamos una posición horizontal (el cuadro izquierdo que no ocupamos)

        await sleep(retardo); // Retardamos antes de volver al padre
        return resultado;
    }

    // Considerando no tomar el elemento actual
    id++;
    const nodo_der = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + sum + ")", "der"); // Agregamos el nodo
    resultado = await esSumaConjunto(set, n - 1, sum, nodo_der); // Esperamos la llamada recursiva
    
    if(resultado){
        ui.establecerResultado(nodo.id, resultado);

        await sleep(retardo); // Retardamos antes de volver al padre
        return resultado;
    } 
    
    // Si no tomamos el elemento actual y da falso, mandamos a tomar el elemento actual
    else{
        id++;
        const nodo_izq = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + (sum - set[n -1]) + ")", "izq"); // Agregamos el nodo
        resultado = await esSumaConjunto(set, n - 1, sum - set[n - 1], nodo_izq) // Esperamos la llamada recursiva
        ui.establecerResultado(nodo.id, resultado);

        await sleep(retardo); // Retardamos antes de volver al padre
        return resultado;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}