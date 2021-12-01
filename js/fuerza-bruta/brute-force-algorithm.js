import {
    UI,
    Arbol,
    agregarNodo
}from './brute-force-animation.js';

// Creamos el nodo raiz e inicializamos el canvas
export const ui = new UI();
export const root = new Arbol("", "0", "(4, 7)", 0, 1);
ui.mostrarNodo(root);

let nodo = agregarNodo(root, "10", "1", "(1, 1)", 2, "der");
nodo = agregarNodo(nodo, "5", "2", "(2, 2)", 4, "der");

nodo = agregarNodo(nodo, "8", "3", "(2, 2)", 8, "der");
nodo = agregarNodo(nodo, "2", "4", "(2, 2)", 16, "der");
ui.establecerResultado(nodo.id, false);
nodo = nodo.getPadre();

nodo = agregarNodo(nodo, "2", "5", "(2, 2)", 15, "izq");
ui.establecerResultado(nodo.id, true);
ui.establecerResultado(nodo.getPadre().id, true);



