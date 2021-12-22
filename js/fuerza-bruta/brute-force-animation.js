/*****************************************************************
	Archivo de animación fuerza bruta
	Este programa se encarga de manejar todos los elementos del DOM
    referentes a la animación de la fuerza bruta. Manejando y organizando así
    todo el árbol de solución, los elementos del panel de pasos y los elementos
    del panel de pseudocódigo.
	
    Fecha: 20/12/2021
	Version: Final 1.0 
	Autores:
			-Martinez Ruiz Alfredo
			-Mendez Castañeda Aurora
			-Mendez Hipolito Emilio
			-Meza Vargas Brandon David

*****************************************************************/

/*--------------------------------Importamos módulos escenciales-----------------------------*/
import { root, ui,  apuntadores_nivel} from './brute-force-algorithm.js';

/*----------------------------------------Clases principales---------------------------------*/
/**
 * Clase que representa la interfaz gráfica del algoritmo de fuerza bruta (el canvas)
 */
export class UI {

    constructor() {
            // Inicializamos el canvas y le adaptamos la resolución
        this.panel_animado = document.querySelector("#panel-animado");
        this.panel_animado.width = window.innerWidth;
        this.panel_animado.height = window.innerHeight;
        this.pseudo_codigo = document.querySelector(".animacion-brute-force.pre-wrapper");
        this.paso = document.querySelector(".pasos .paso");

        // Agregamos el listener para el canvas
        window.addEventListener("resize", () => {
            this.repintar();
        });
    }
    /**
     * Función que agrega un nodo dentro de su div correspondiente
     * @param {Arbol} Arbol.level Nivel en el que se encontrará el nodo
     * @param {Arbol} Arbol.value Valor que mostrará el circulo del nodo
     * @param {Arbol} Arbol.info Información que mostrará el cuadro 
     * informativo del nodo
     * @param {Arbol} Arbol.id Id del nodo
     * 
     */
    mostrarNodo({ level, valor = "", info, id }) {
        // Creamos el nodo en el nivel y div adecuado calculado por los apuntadores de nivel
        let nodo = document.querySelector(`#level-${level} .nodo:nth-child(${apuntadores_nivel[level]})`);
        apuntadores_nivel[level] -= 1; // Restamos el número de nodos cubiertos en el nivel
        nodo.dataset.id = id; // Asignamos un valor a ese nodo

        // Agregamos el valor del nodo en el circulo
        let nodo_circulo = document.createElement("div");
        nodo_circulo.classList.add("nodo-circulo", "color-default-circulo");
        nodo_circulo.innerHTML = `<span>${valor}</span>`;
        nodo.appendChild(nodo_circulo);

        // Agregamos la información del nodo en el cuadro informativo
        let nodo_info = document.createElement("div");
        nodo_info.classList.add("nodo-info", "color-default-info");
        nodo_info.innerHTML = `<span>${info}</span>`;
        nodo.appendChild(nodo_info);
    }

    /**
     * Función que pinta la flecha que une dos nodos
     * @param {{x:float, y:float}} inicio Punto donde iniciará la flecha
     * @param {{x:float, y:float}} fin Punto donde terminará la flecha
     */
    agregarFlecha(inicio, fin) {
        const grueso = 2; // Grueso de la flecha
        const angulo_punta = 20; // Ángulo de la punta de la flecha
        const largo_punta = 10; // Largo de la punta de la flecha

        // Comprobamos que existe el contexto del canvas
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
        ctx.strokeStyle = fin.color;
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

    /**
     * Función que cambia el color de un nodo respecto a su resultado en el algoritmo
     * @param {int} id Id del nodo al que se le cambiarán los colores
     * @param {boolean} resultado Resultado si salió verdadero o falso
     *  en el algoritmo
     */
    establecerResultado(id, resultado) {
        // Seleccionamos los elementos del nodo
        const elemento_circulo = document.querySelector(`div[data-id="${id}"] .nodo-circulo`);
        const elemento_info = document.querySelector(`div[data-id="${id}"] .nodo-info`);

        // Cambiamos los colores
        if (resultado === true) {
            elemento_circulo.classList.add("color-true-circulo");
            elemento_info.classList.add("color-true-info");
        } else {
            elemento_circulo.classList.add("color-false-circulo");
            elemento_info.classList.add("color-false-info");
        }
        this.repintar();
    }

    /**
     * Función que repinta las flechas sobre el canvas de animación recorriendo
     * y relacionando todos los nodos presentes
     */
    repintar() {
        if(this.pseudo_codigo.classList.contains("d-none")) return;

        // Obtenemos el contexto y lo limpiamos
        const context = this.panel_animado.getContext('2d');
        context.clearRect(0, 0, this.panel_animado.width, this.panel_animado.height);

        // Actualizamos la resolución del canvas
        this.panel_animado.width = window.innerWidth;
        this.panel_animado.height = window.innerHeight;

        // Recorremos todos los nodos del árbol y vamos relacionando a los padres con los
        // hijos

        root.forEach(nodo => {
            if (nodo.izquierdo != null) {
                const elemento_info = obtenerCoordsInfo(nodo);
                const elemento_circulo = obtenerCoordsCirculo(nodo.izquierdo);

                ui.agregarFlecha(elemento_info, elemento_circulo);
            }
            if (nodo.derecho != null) {
                const elemento_info = obtenerCoordsInfo(nodo);
                const elemento_circulo = obtenerCoordsCirculo(nodo.derecho);

                ui.agregarFlecha(elemento_info, elemento_circulo);
            }
        });
    }

    /**
     * Función que decrece el apuntador de nivel en los cuadros
     * @param {Arbol} hermano Nodo hermano que contiene el nivel del apuntador 
     * el cual se va saltar
     */
    saltarEspHorizontal(hermano){
        let aux_lvl = hermano.level;
        let nodos_omitidos = 1;

        while(aux_lvl <= 4){
            apuntadores_nivel[aux_lvl] -= nodos_omitidos;
            nodos_omitidos *= 2;

            aux_lvl++;
        }
    }

    /**
     * Función que le agrega una pequeña animación al nodo de resultado final y al paso final
     * @param {int} id Id del nodo que se va animar como resultado final
     * @param {String} clases Clases que se le van agregar al paso cuando finalice la ejecución
     */
    establecerResultadoFinal(id, clases){
        // Seleccionamos el nodo raíz y le asignamos el efecto
        const elemento = document.querySelector(`div[data-id="${id}"]`);
        elemento.classList.add("resultado-final");

        // Agregamos las clases al texto
        this.paso.classList.add(clases);
    }

    /**
     * Función que modifica el texto a mostar en el paso dentro del panel de pasos
     * @param {String} txt_paso Texto que se va a mostrar en el paso
     */
    mostrarPaso(txt_paso){
        this.paso.textContent = txt_paso;
    }

    /**
     * Función que destaca una línea dada del pseudocódigo
     * @param {int} linea Numero de línea del pseudocódigo a destacar
     */
    destacarInstruccion(linea){
        const instruccion = this.pseudo_codigo.querySelector(`pre:nth-child(${linea})`);
        instruccion.classList.add("linea-destacada");
    }

    /**
     * Función que remueve la destacación de todas las líneas del pseudocódigo
     */
    limpiarInstrucciones(){
        const instrucciones = this.pseudo_codigo.querySelectorAll("pre");
        instrucciones.forEach(instruccion => {
            instruccion.classList.remove("linea-destacada");
        });
    }

}

/**
 * Clase que sirve para manejar lógicamente el árbol del algoritmo
 * @param {int} valor Valor que irá dentro del círculo
 * @param {int} id Identificador html del nodo de
 * @param {String} info Información del nodo "(x, y)"
 * @param {int} level Nivdel del nodo dentro del árbol
 */
export class Arbol {

    constructor(valor, id, info, level) {
            this.valor = valor;
            this.id = id;
            this.info = info;
            this.level = level;

            // Apuntadores a los nodos para acceso rápido
            this.derecho = null;
            this.padre = null;
        }
        /**
         * Función que agrega un nodo hijo al padre
         * @param {int} valor valos que irá dentro del círculo
         * @param {Int} id Identificador html del nodo de
         * @param {String} info Información del nodo "(x, y)"
         * @param {String} posicion Posición del nodo respecto a la raíz (der, izq)
         * @returns {Arbol} El nodo hijo creado
         */
    agregarHijo(valor, id, info, posicion) {
        // Creamos el nodo
        const nodo = new Arbol(valor, id, info, this.level + 1);

        // Asignamos el padre
        nodo.padre = this;

        // Asignamos el hijo
        if (posicion === "izq")
            this.izquierdo = nodo;
        else
            this.derecho = nodo;

        return nodo;
    }

    /**
     * Obtenemos el padre del nodo
     * @returns {Arbol} Retorna el nodo padre
     */
    getPadre() {
        return this.padre;
    }

    /**
     * Función que recorre todos los nodos del árbol
     * @param {function} callback Función que ejecutará con cada elemento
     */
    forEach(callback) {
        callback(this);

        if (this.izquierdo != null)
            this.izquierdo.forEach(callback);

        if (this.derecho != null)
            this.derecho.forEach(callback);
    }

    /**
     * Función que manda a llamar al método que le agrega una animación al nodo resultante
     * final
     * @param {String} clases Clases que se le van agregar al paso cuando finalice la ejecución
     */
    establecerResultadoFinal(clases){
        ui.establecerResultadoFinal(this.id, clases);
    }
}

/**
 * Función que hace un nuevo nodo lógico y lo muestra en pantalla
 * @param {Arbol} nodo_padre Padre al cual agregaremos el nodo hijo
 * @param {int} valor Valor que tendrá el nodo
 * @param {int} id Identificador html del nodo
 * @param {String} info Información que mostrará el nodo acerca de la llamada
 * @param {String} posicion Posición del nodo respecto a la raíz (der, izq)
 * @returns {Arbol} El nodo hijo creado
 */
export function agregarNodo(nodo_padre, valor, id, info, posicion) {
    // Creamos un nodo y lo mostramos
    const nodo_hijo = nodo_padre.agregarHijo(valor, id, info, posicion);
    ui.mostrarNodo(nodo_hijo);

    // Relacionamos al nodo con el nodo padre y pintamos su flecha
    const elemento_info = obtenerCoordsInfo(nodo_padre);
    const elemento_circulo = obtenerCoordsCirculo(nodo_hijo);
    ui.agregarFlecha(elemento_info, elemento_circulo);

    return nodo_hijo; // Retornamos el nodo creado
}

/**
 * Función que obtiene las coordenadas del cuadro informativo de un nodo donde conectará
 * la flecha
 * @param {Arbol} Arbol.id Obteemos el id del nodo pasado por argumento 
 * @returns {{x:float, y:float}} Las coordenadas sobre la pantalla del cuadro
 * informativo donde conectará la flecha
 */
function obtenerCoordsInfo({ id }) {
    // Seleccionamos el cuadro infomrativo del nodo
    const elemento_info = document.querySelector(`div[data-id="${id}"] .nodo-info`);

    // Obtenemos las coordenadas del cuadro informativo donde irá la flecha
    const info_x = elemento_info.getBoundingClientRect().x + elemento_info.clientWidth / 2;
    const info_y = elemento_info.getBoundingClientRect().y + elemento_info.clientHeight;
    // Obtenemos el color del cuadro informativo
    const color = window.getComputedStyle(elemento_info, null).getPropertyValue('background-color');

    return { x: info_x, y: info_y, color }; // Retornamos las coordenadas
}

/**
 * Función que obtiene las coordenadas del círculo de un nodo donde conectará la flecha
 * @param {Arbol} Arbol.id Obteemos el id del nodo pasado por argumento
 * @returns {{x:float, y:float}} Las coordenadas sobre la pantalla del circulo donde 
 * conectará la flecha
 */
function obtenerCoordsCirculo({ id }) {
    // Seleccionamos el círculo del nodo
    const elemento_circulo = document.querySelector(`div[data-id="${id}"] .nodo-circulo`);

    // Obtenemos las coordenadas del círculo donde irá la flecha
    const circulo_x = elemento_circulo.getBoundingClientRect().x + elemento_circulo.clientWidth / 2;
    const circulo_y = elemento_circulo.getBoundingClientRect().y;
    // Obtenemos el color del círculo
    const color = window.getComputedStyle(elemento_circulo, null).getPropertyValue('background-color');

    return { x: circulo_x, y: circulo_y, color }; // Retornamos las coordenadas
}

/**
 * Función que calcula el ángulo de la recta que conecta dos puntos
 * @param {{x:float, y:float}} p_1 Punto 1
 * @param {{x:float, y:float}} p_2 Punto 2
 * @returns {float} Angulo entre los dos puntos
 */
function angulo(p_1, p_2) {
    // Obtenemos las dos diferenciales
    var dy = p_2.y - p_1.y;
    var dx = p_2.x - p_1.x;
    // Calculamos el ángulo en radiantes
    var theta = Math.atan2(dy, dx); // rango (-PI, PI]
    // Convertimos a grados
    theta *= 180 / Math.PI; // radianes a grados, rango (-180, 180]
    return theta;
}

/**
 * Función que obtiene un vértice de la punta de la flecha 
 * con base en el ángulo, punto inicial y dimensión de esta 
 * @param {float} angulo Angulo de inclinación de la punta de la flecha
 * @param {float} dimension Dimensión de la punta de la flecha
 * @param {{x:float, y:float}} punto Final de la flecha
 * @returns {{x:float, y:float}} Vertice de la punta de la flecha
 */
function obtenerVerticePunta(angulo, dimension, punto) {
    dimension *= -1;
    // Calculamos las componentes de la recta en esa dimensión a partir del punto
    const x = punto.x + dimension * Math.cos(angulo * Math.PI / 180);
    const y = punto.y + dimension * Math.sin(angulo * Math.PI / 180);

    return { x, y }; // Retornamos el vertice
}