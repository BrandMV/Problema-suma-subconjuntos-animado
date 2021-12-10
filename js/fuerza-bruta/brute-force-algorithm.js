import {
    UI,
    Arbol,
    agregarNodo
} from './brute-force-animation.js';


// Creamos el nodo raiz e inicializamos el canvas
export const ui = new UI();
export var root;
let retardo;
let id = 1;

export function main(obj) {

    root = new Arbol("", 0, "(" + obj.valores.length + "," + obj.suma + ")", 0);
    ui.mostrarNodo(root);
    retardo = obj.velocidad * 1000;
    esSumaConjunto(obj.valores, obj.valores.length, obj.suma, root);
    /*
    let nodo = agregarNodo(root, 10, 1, "(1, 1)", "der");
    nodo = agregarNodo(nodo, 5, 2, "(2, 2)", "der");

    nodo = agregarNodo(nodo, 8, 3, "(2, 2)", "der");
    nodo = agregarNodo(nodo, 2, 4, "(2, 2)", "der");
    ui.establecerResultado(nodo.id, false);
    nodo = nodo.getPadre();

    nodo = agregarNodo(nodo, 2, 5, "(2, 2)", "izq");
    ui.establecerResultado(nodo.id, true);
    ui.establecerResultado(nodo.getPadre().id, true);

    nodo = nodo.getPadre().getPadre();
    nodo = agregarNodo(nodo, 3, 6, "(2, 2)", "izq");*/
}

async function esSumaConjunto(set, n, sum, nodo) {
    let resultado;

    await sleep(retardo);
    if(sum == 0){
        ui.establecerResultado(nodo.id, true);
        await sleep(retardo);
        return true;
    }
    if(sum < 0 || (n == 0 && sum != 0)){
        ui.establecerResultado(nodo.id, false);
        await sleep(retardo);
        return false;
    }

    if (set[n - 1] > sum) {
        id++;
        const nodo_der = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + sum + ")", "der");
        resultado = await esSumaConjunto(set, n - 1, sum, nodo_der);
        ui.establecerResultado(nodo.id, resultado);
        await sleep(retardo);
        return resultado;
    }

    id++;
    const nodo_der = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + sum + ")", "der");
    resultado = await esSumaConjunto(set, n - 1, sum, nodo_der);
    
    if(resultado){
        ui.establecerResultado(nodo.id, resultado);
        await sleep(retardo);
        return resultado;
    } else{
        id++;
        const nodo_izq = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + (sum - set[n -1]) + ")", "izq");
        resultado = await esSumaConjunto(set, n - 1, sum - set[n - 1], nodo_izq)
        
        ui.establecerResultado(nodo.id, resultado);
        await sleep(retardo);
        return resultado;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}