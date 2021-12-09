import {
    UI,
    Arbol,
    agregarNodo
} from './brute-force-animation.js';


// Creamos el nodo raiz e inicializamos el canvas
export const ui = new UI();
export const root = new Arbol("", "0", "(4, 7)", 0, 1);


export function main() {

    ui.mostrarNodo(root);

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
    nodo = agregarNodo(nodo, 3, 6, "(2, 2)", "izq");
}