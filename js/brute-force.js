class UI {
    #panel_animado = document.querySelector('#panel-animado');

    constructor() {
        // Inicializamos el canvas
        this.#panel_animado.setAttribute("height", window.innerHeight);
        this.#panel_animado.setAttribute("width", window.innerWidth);
    }

    mostrarNodo({ level, numero, valor = "", info, id}) {
        let nodo = document.querySelector(`#level-${level} .nodo:nth-child(${numero})`);
        nodo.dataset.id = id; // Asignamos un valor a ese nodo

        let nodo_circulo = document.createElement("div");
        nodo_circulo.classList.add("nodo-circulo", "color-default-circulo");
        nodo_circulo.innerHTML = `<span>${valor}</span>`;
        nodo.appendChild(nodo_circulo);

        let nodo_info = document.createElement("div");
        nodo_info.classList.add("nodo-info", "color-default-info");
        nodo_info.innerHTML = `<span>${info}</span>`;
        nodo.appendChild(nodo_info);

        return nodo_circulo;
    }

    // Agregamos una flecha conforme de ingresen las posiciones
    agregarFlecha(inicio, fin) {
        const grueso = 3;
        const color = '#02457A';

        if (this.#panel_animado.getContext == null) return;

        // Estableciendo el contexto
        var ctx = this.#panel_animado.getContext('2d');
        ctx.strokeStyle = color;
        ctx.lineWidth = grueso;

        // Dibujando el cuerpo de la flecha
        ctx.beginPath();
        ctx.moveTo(inicio.x, inicio.y);
        ctx.lineTo(fin.x, fin.y);
        ctx.stroke();

        // Obtenemos la ecuación de la recta que une los dos puntos
        const recta = rectaDosPuntos(inicio, fin);

        // Obtenemos e punto donde estará la recta perpendicular
        const punto = {};

        if (recta.x != null) {
            punto.x = recta.x;
            punto.y = fin.y - 3; // El punto estará 10px arriba del punto final
        } else if (recta.m != 0) {
            punto.y = fin.y - 3; // El punto estará 10px arriba del punto final
            punto.x = (punto.y - recta.b) / recta.m;
        } else {
            punto.x = fin.x - 3;
            punto.y = fin.y; // El punto estará en el punto final
        }
        //console.log(punto);

        // Obtenemos la ecuación de la recta perpendicular
        const recta_perpendicular = rectaPerpendicular(recta, punto);

        let vertices = [{}, {}];

        if (recta_perpendicular.x != null) {
            vertices[0].x = recta_perpendicular.x;
            vertices[0].y = punto.y - 7;
            vertices[1].x = recta_perpendicular.x;
            vertices[1].y = punto.y + 7;

        } else if (recta_perpendicular.m != 0) {
            vertices[0].x = punto.x - 1;
            vertices[0].y = vertices[0].x * recta_perpendicular.m + recta_perpendicular.b;
            vertices[1].x = punto.x + 1;
            vertices[1].y = vertices[1].x * recta_perpendicular.m + recta_perpendicular.b;
        } else {
            vertices[0].x = punto.x - 7;
            vertices[0].y = punto.y;
            vertices[1].x = punto.x + 7;
            vertices[1].y = punto.y;
        }

        /*
        console.log(recta);
        console.log(recta_perpendicular);
        console.log(vertices);*/

        // Dibujando la punta de la flecha
        ctx.beginPath();
        ctx.moveTo(fin.x, fin.y);

        vertices.forEach(vertice => {
            ctx.lineTo(vertice.x, vertice.y);
        });
        ctx.fill();

    }

    establecerResultado(id, resultado) {
        const elemento_circulo = document.querySelector(`div[data-id="${id}"] .nodo-circulo`);
        const elemento_info = document.querySelector(`div[data-id="${id}"] .nodo-info`);

        if(resultado === true){
            elemento_circulo.classList.add("color-true-circulo");
            elemento_info.classList.add("color-true-info");
        } else{
            elemento_circulo.classList.add("color-false-circulo");
            elemento_info.classList.add("color-false-info");
        }
    }       
}

class Arbol{
    constructor(valor, id, info, level, numero){
        this.valor = valor; // Valor dentro del círculo
        this.id = id; // Identificador del nodo
        this.info = info; // Información del nodo "(x, y)"
        this.level = level; // Nivel del nodo
        this.numero = numero; // Número del nodo dentro del nivel

        // Apuntadores a los nodos para acceso rápido
        this.derecho = null;
        this.izquierdo = null;
        this.padre = null;
    }

    agregarHijo(valor, id, info, numero, posicion){
        // Creamos el nodo
        const nodo = new Arbol(valor, id, info, this.level+1, numero);

        // Asignamos el padre
        nodo.padre = this;

        // Asignamos el hijo
        if(posicion === "izq")
            this.izquierdo = nodo;
        else
            this.derecho = nodo;
        

        return nodo;
    }

    getPadre(){
        return this.padre;
    }

}

// Creamos el nodo raiz e inicializamos el canvas
const ui = new UI();
const root = new Arbol("", "0", "(4, 7)", 0, 1);
ui.mostrarNodo(root);

let nodo = agregarNodo(root, "10", "1", "(1, 1)", 2, "der");
nodo = agregarNodo(nodo, "5", "2", "(2, 2)", 4, "der");

nodo = agregarNodo(nodo, "8", "3", "(2, 2)", 8, "der");
nodo = agregarNodo(nodo, "2", "4", "(2, 2)", 16, "der");
nodo = nodo.getPadre();

nodo = agregarNodo(nodo, "2", "5", "(2, 2)", 15, "izq");
ui.establecerResultado(nodo.id, true);
ui.establecerResultado(nodo.getPadre().id, false);


function agregarNodo(nodo_padre, valor, id, info, numero, posicion){
    const nodo_hijo = nodo_padre.agregarHijo(valor, id, info, numero, posicion);
    const elemento_circulo = ui.mostrarNodo(nodo_hijo);

    const elemento_info = document.querySelector(`div[data-id="${nodo_padre.id}"] .nodo-info`);
    const nodo_padre_x = elemento_info.getBoundingClientRect().x + elemento_info.clientWidth / 2;
    const nodo_padre_y = elemento_info.getBoundingClientRect().y + elemento_info.clientHeight;
   
    const nodo_hijo_x = elemento_circulo.getBoundingClientRect().x + elemento_circulo.clientWidth / 2;
    const nodo_hijo_y = elemento_circulo.getBoundingClientRect().y;

    ui.agregarFlecha({ x: nodo_padre_x, y: nodo_padre_y }, { x: nodo_hijo_x, y: nodo_hijo_y });
    return nodo_hijo;
}


function resize() {
    let nodo = document.querySelector('#level-0 .nodo:first-child .nodo-info');
    const nodo_x = nodo.getBoundingClientRect().x + nodo.clientWidth / 2;
    const nodo_y = nodo.getBoundingClientRect().y + nodo.clientHeight;

    nodo = document.querySelector('#level-1 .nodo:nth-child(2) .nodo-circulo');
    const nodoSec_x = nodo.getBoundingClientRect().x + nodo.clientWidth / 2;
    const nodoSec_y = nodo.getBoundingClientRect().y;

    dibujarFlecha({ x: nodo_x, y: nodo_y }, { x: nodoSec_x, y: nodoSec_y }, panel_animado);
}

window.onresize = resize;

/**
 * Función que obtiene los coeficientes para la recta entre dos puntos
 * @param {*} inicio Objeto que contiene las coordenadas x y y de inicio
 * @param {*} fin Objeto que contiene las coordenadas x y y de fin
 */
function rectaDosPuntos(inicio, fin) {
    if (fin.x - inicio.x == 0) {
        const x = fin.x;
        return { x };
    }
    else {
        const m = (fin.y - inicio.y) / (fin.x - inicio.x);
        const b = inicio.y - m * inicio.x;
        return { m, b };
    }
}

/**
 * Función que obtiene la recta perpendicular a otra según un punto
 * @param {*} recta Objeto que contiene los coeficientes de la recta
 * @param {*} punto Objeto con coordenadas x y y que será donde esté la base de la flecha 
 */
function rectaPerpendicular(recta, punto) {
    if (recta.x != null) {
        const m = 0;
        const b = punto.x;
        return { m, b };
    } else if (recta.m == 0) {
        const x = punto.x;
        return { x };
    } else {
        const m = -1 / recta.m;
        const b = punto.y - m * punto.x;
        return { m, b };
    }
}


