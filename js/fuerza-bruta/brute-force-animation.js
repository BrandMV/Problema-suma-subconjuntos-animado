// Importamos variables globales del algoritmo
import {root, ui} from './brute-force-algorithm.js';
let panel_visible = false;

export class UI {

    constructor() {
        // Inicializamos el canvas
        this.panel_animado = document.querySelector("#panel-animado");
        this.panel_animado.width = this.panel_animado.clientWidth;
        this.panel_animado.height = this.panel_animado.clientWidth;


        window.addEventListener("resize", () =>{
            this.resize();
        });
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
    }

    // Agregamos una flecha conforme de ingresen las posiciones
    agregarFlecha(inicio, fin) {
        const grueso = 2;
        const angulo_punta = 20;
        const largo_punta = 10;

        if (this.panel_animado.getContext == null) return;

        // Estableciendo el contexto
        var ctx = this.panel_animado.getContext('2d');

        // Dibujamos un circulo al inicio de la flecha
        ctx.beginPath();
        ctx.fillStyle = inicio.color;
        ctx.strokeStyle = inicio.color;
        ctx.arc(inicio.x, inicio.y, 3, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
        // Dibujando el cuerpo de la flecha
        ctx.beginPath();
        ctx.strokeStyle = inicio.color;
        ctx.lineWidth = grueso;
        ctx.moveTo(inicio.x, inicio.y);
        ctx.lineTo(fin.x, fin.y);
        ctx.stroke();
        ctx.closePath();

        // Obtenemos el angulo de inclinación de la recta que une los puntos
        const angulo_flecha = angulo(inicio, fin);
        // Obtenemos el ángulo para el vértice derecho de la punta
        const angulo_vertice_1 = angulo_flecha - angulo_punta;
        // Obtenemos el ángulo para el vértice izquierdo de la punta
        const angulo_vertice_2 = angulo_flecha + angulo_punta;

        // Obtenemos los vertices de la punta
        const vertices = [{}, {}];
        vertices[0] = obtenerVerticePunta(angulo_vertice_1, largo_punta, fin);
        vertices[1] = obtenerVerticePunta(angulo_vertice_2, largo_punta, fin);

        // Dibujando la punta de la flecha
        ctx.beginPath();
        ctx.fillStyle = fin.color;
        ctx.moveTo(fin.x, fin.y);
        vertices.forEach(vertice => {
            ctx.lineTo(vertice.x, vertice.y);
        });
        ctx.fill();
        ctx.closePath();
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
        this.resize();
    }
    
    resize() {
        const context = this.panel_animado.getContext('2d');
    
        context.clearRect(0, 0, this.panel_animado.width, this.panel_animado.height);

        // Actualizamos el tamaño del canvas
        this.panel_animado.setAttribute("height", window.innerHeight);
        this.panel_animado.setAttribute("width", window.innerWidth);
        
        // Recorremos todos los nodos del árbol
        root.forEach(nodo => {
            if(nodo.izquierdo != null){
                const elemento_info = obtenerCoordsInfo(nodo);
                const elemento_circulo = obtenerCoordsCirculo(nodo.izquierdo);

                ui.agregarFlecha(elemento_info, elemento_circulo);
            }
            if(nodo.derecho != null){
                const elemento_info = obtenerCoordsInfo(nodo);
                const elemento_circulo = obtenerCoordsCirculo(nodo.derecho);
               
                ui.agregarFlecha(elemento_info, elemento_circulo);
            }
        });
    }
}

export class Arbol{

    /**
     * 
     * @param {*} valor Valor que irá dentro del círculo
     * @param {*} id Identificador html del nodo de
     * @param {*} info Información del nodo "(x, y)"
     * @param {*} level Nivdel del nodo dentro del árbol
     * @param {*} numero Numero del nodo dentro del nivel
     */
    constructor(valor, id, info, level, numero){
        this.valor = valor;
        this.id = id; 
        this.info = info; 
        this.level = level;
        this.numero = numero;

        // Apuntadores a los nodos para acceso rápido
        this.derecho = null;
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

    forEach(callback){
        callback(this);

        if(this.izquierdo != null)
            this.izquierdo.forEach(callback);

        if(this.derecho != null)
            this.derecho.forEach(callback);
    }
}

export function agregarNodo(nodo_padre, valor, id, info, numero, posicion){
    const nodo_hijo = nodo_padre.agregarHijo(valor, id, info, numero, posicion);
    ui.mostrarNodo(nodo_hijo);

    const elemento_info = obtenerCoordsInfo(nodo_padre);
    const elemento_circulo = obtenerCoordsCirculo(nodo_hijo);

    console.log(elemento_info, elemento_circulo);

    ui.agregarFlecha(elemento_info, elemento_circulo);

    return nodo_hijo; // Retornamos el nodo creado
}

function obtenerCoordsInfo({id}){
    const elemento_info = document.querySelector(`div[data-id="${id}"] .nodo-info`);
    const info_x = elemento_info.getBoundingClientRect().x + elemento_info.clientWidth / 2;
    const info_y = elemento_info.getBoundingClientRect().y + elemento_info.clientHeight;
    const color = window.getComputedStyle(elemento_info ,null).getPropertyValue('background-color');

    return { x: info_x, y: info_y, color};
}

function obtenerCoordsCirculo({id}){
    const elemento_circulo = document.querySelector(`div[data-id="${id}"] .nodo-circulo`);
    const circulo_x = elemento_circulo.getBoundingClientRect().x + elemento_circulo.clientWidth / 2;
    const circulo_y = elemento_circulo.getBoundingClientRect().y;
    const color = window.getComputedStyle(elemento_circulo, null).getPropertyValue('background-color');

    return { x: circulo_x, y: circulo_y, color};
}

function angulo(p_1, p_2) {
    var dy = p_2.y - p_1.y;
    var dx = p_2.x - p_1.x;
    var theta = Math.atan2(dy, dx); // rango (-PI, PI]
    theta *= 180 / Math.PI; // radianes a grados, rango (-180, 180]
    return theta;
}

function obtenerVerticePunta(angulo, dimension, punto){
    dimension *= -1;
    const x = punto.x + dimension * Math.cos(angulo * Math.PI / 180);
    const y = punto.y + dimension * Math.sin(angulo * Math.PI / 180);

    return { x, y };
}

function visible(elemento){
     const observer = new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting){ // Si está visible o no
           panel_visible = true;
        } else{
            panel_visible = false;
        }
    });

    // Para reportar que un elemento está visible
    observer.observe(elemento);
}