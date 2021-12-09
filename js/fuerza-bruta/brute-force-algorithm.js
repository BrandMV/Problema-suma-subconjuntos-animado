import {
    UI,
    Arbol,
    agregarNodo
} from './brute-force-animation.js';


// Creamos el nodo raiz e inicializamos el canvas
export const ui = new UI();
export var root = new Arbol();
let aux;
let id = 1;
let nodo;

export function main(obj) {

    root = new Arbol("", 0, "(" + obj.valores.length + "," + obj.suma + ")", 0);
    aux = obj.valores.length;
    ui.mostrarNodo(root);

    esSumaConjunto(obj.valores, obj.valores.length, obj.suma, "der");
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

function esSumaConjunto(set, n, sum, pos) {

    nodo = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + sum + ")", pos);

    // Casos Base
    if (sum == 0) {
        ui.establecerResultado(nodo.id, true);
        ui.establecerResultado(nodo.getPadre().id, true);
        return true;
    }
    if (sum < 0 || (n == 0 && sum != 0)) {
        ui.establecerResultado(nodo.id, false);
        return false;
    }

    //Si el último elemento es mayor a la suma que estamos verificando se ignora
    if (set[n - 1] > sum) {
        //nodo = nodo.getPadre();
        return esSumaConjunto(set, n - 1, sum);
    }

    //La primera opción es no incluirlo y la segunda es incluirlo
    id++;
    //nodo = nodo.getPadre();
    if (!esSumaConjunto(set, n - 1, sum, "der")) {

        return esSumaConjunto(set, n - 1, sum - set[n - 1], "izq");
    } else {

        return esSumaConjunto(set, n - 1, sum, "der");
    }

    //return esSumaConjunto(set, n - 1, sum) || esSumaConjunto(set, n - 1, sum - set[n - 1]);
}