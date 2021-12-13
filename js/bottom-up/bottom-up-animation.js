/*--------------------------------Importamos módulos escenciales-----------------------------*/
import { tabla, ui } from './bottom-up-algorithm.js';

/*----------------------------------------Clases principales---------------------------------*/

/**
 * Clase que representa la interfaz gráfica del algoritmo de fuerza bruta (la tabla)
 */
export class UI {
    /**
     * Inicializamos la tabla fuera del constructor
     * @param {Tabla} tabla Tabla que representa las cantidad de filas y columnas
     */
    establecerTabla(tabla){
        // Inicializa la tabla y la selecciona del DOM
        this.tabla = tabla;
        this.tabla_wrapper = document.querySelector('.tabla-wrapper');
        
        // Mandamos a inicializar la primer fila y columna
        this.inicializarGrid();
    }
    /**
     * Función que inicializa el grid de la tabla asignando los tamaños de suma para
     * la primer fila y los valores del arreglo para la primer columna
    */
    inicializarGrid(){
        // Asignamos el grid conforme a los datos ingresados, entre mayor sea la suma, más
        // columnas tendrá la tablay entre más elementos tenga el arreglo, más filas tendrá la 
        // tabla
        this.tabla_wrapper.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
        this.tabla_wrapper.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;

        // Agregamos la primer fila
        for(let j = 1; j <= this.tabla.cols; j++){
            // Creamos la celda, le asignamos sus clases y posición
            let elemento_suma = document.createElement('div');
            elemento_suma.classList.add('table-cell', 'color-default-circulo');
            elemento_suma.style.gridRow = `1`;
            elemento_suma.style.gridColumn = ` ${j}`;
            
            // Asignamos su clave ij para posterior selección y su texto
            elemento_suma.dataset.ij = `-1, ${j-2}`;
            elemento_suma.textContent = `${j-2}`;

            // Agregamos la celda a la tabla
            this.tabla_wrapper.appendChild(elemento_suma);
        }

        // Agregamos la primer columna
        for(let i = 2; i <= this.tabla.rows; i++){
            // Creamos la celda, le asignamos sus clases y posición
            let elemento_suma = document.createElement('div');
            elemento_suma.classList.add('table-cell', 'color-default-circulo');
            elemento_suma.style.gridRow = `${i}`;
            elemento_suma.style.gridColumn = `1`;

            // Asignamos su clave ij para posterior selección y su texto
            elemento_suma.dataset.ij = `${i-2}, -1`;
            elemento_suma.textContent = `${this.tabla.arreglo[i-3]}`;

            // Agregamos la celda a la tabla
            this.tabla_wrapper.appendChild(elemento_suma);
        }

        // En los casos iniciales donde irán el indicador de posición y la representación
        // del arreglo vacío
        document.querySelector('[data-ij="-1, -1"]').textContent = "i,j";
        document.querySelector('[data-ij="0, -1"]').textContent = "0";
    }

    /**
     * Función que crear un área en la interfaz y la posiciona en le grid con las posiciones
     * dadas
     * @param {int} i Fila de la celda
     * @param {int} j Columna de la celda
     */
    agregarArea(i, j){
        // Creamos la celda, le asignamos sus clases y posición
        let area = document.createElement('div');
        area.classList.add('table-cell', 'color-true-info-dark');
        area.style.gridRow = `${i+2}`;   
        area.style.gridColumn = `${j+2}`;
        
        // Asignamos su clave ij para posterior selección
        area.dataset.ij = `${i}, ${j}`;

        // Agregamos la celda a la tabla
        this.tabla_wrapper.appendChild(area);
    }

    /**
     * Función que cambia el color de una celda dándole una clase dada
     * @param {int} i Fila de la celda
     * @param {int} j Columna de la celda
     * @param {String} color Clase del color que tendrá la celda
     */
    colorearCelda(i, j, color){
        // Selecionamos la celda y le borraremos la clase de color que tenga
        const area = document.querySelector(`[data-ij="${i}, ${j}"]`);
        const color_anterior = Array.from(area.classList).find(clase => clase.includes('color-'));
        area.classList.remove(color_anterior);
        
        // Le agregamos la clase del color que se le pasa
        area.classList.add(color);
    }

    /**
     * 
     * @param {int} i Fila de la celda
     * @param {int} j Columna de la celda
     * @param {String} texto Texto que se le pondrá a la celda
     */
    establecerTexto(i, j, texto){
        const area = document.querySelector(`[data-ij="${i}, ${j}"]`);
        area.textContent = texto;
    }

    /**
     * Función que obtiene el texto que tiene una celda (T/F)
     * @param {int} i Fila de la celda
     * @param {int} j Columna de la celda
     * @returns {String} Texto que contiene la celda
     */
    obtenerResultadoArea(i, j){
        const area = document.querySelector(`[data-ij="${i}, ${j}"]`);
        return area.textContent;
    }
}

/**
 * Clase que representa lógicamente la tabla que se va representar en la interfaz
 */
export class Tabla {

    // Objeto de clases de colores para cada momento en la interfaz
    clrs = {
        true: 'color-true-circulo',
        false: 'color-false-circulo',
        indice: 'color-default-circulo',
        seleccion: 'color-true-info-dark',
        comparacion: 'color-default-info',
    }

    /**
     * Establecemos los parámetros de la tabla fuera del constructor
     * @param {Array[int]} arreglo Arreglo de números que se va a representar en la tabla
     * @param {int} suma Suma que se va a buscar en la tabla
     */
    establecerTabla(arreglo, suma){
        this.arreglo = arreglo;
        this.rows = arreglo.length + 2;
        this.cols = suma + 2;
    }
    /**
     * Función que genera una nueva celda y la selecciona en la tabla
     * @param {int} indice Indice del arreglo que se va a representar en la tabla
     * @param {int} n Valor de suma en la que se va a buscar el arreglo
     */
    generarCelda(indice, n){
        const i = indice + 1;
        const j = n;

        // Agregamos la celda a la tabla
        ui.agregarArea(i, j, this.clrs['seleccion']);

        // Seleccionamos los índices de la celda
        ui.colorearCelda(-1, j, this.clrs['seleccion']);
        ui.colorearCelda(i, -1, this.clrs['seleccion']);
    }

    /**
     * Función que resalta dos celdas representando la opción de si se toma o no se toma
     * @param {int} indice Indice del arreglo que se va a representar en la tabla
     * @param {int} n Valor de suma en la que se va a buscar el arreglo
     * @param {int} valor_tomado Valor que se le va restar a la suma actual para 
     * comparar con que no se tome
     */
    comparar(indice, n, valor_tomado){
        const i = indice + 1;
        const j = n;

        // Seleccionamos el resultado de no tomarlo
        ui.colorearCelda(i-1, j, this.clrs['comparacion']);
        // Seleccionamos el resultado de sí tomarlo
        ui.colorearCelda(i-1, j-valor_tomado, this.clrs['comparacion']);
    }

    /**
     * Función que vuelve a su color original a las celdas resaltadas en la comparación
     * anterior
     * @param {int} indice Indice del arreglo que se va a representar en la tabla
     * @param {int} n Valor de suma en la que se va a buscar el arreglo
     * @param {int} valor_tomado Valor que se le va restar a la suma actual para 
     * comparar con que no se tome
     */
    limpiarComparacion(indice, n, valor_tomado){
        const i = indice + 1;
        const j = n;

        // Deseleccionamos el resultado de no tomarlo
        if(ui.obtenerResultadoArea(i-1, j) === 'T')
            ui.colorearCelda(i-1, j, this.clrs['true']);
        else
            ui.colorearCelda(i-1, j, this.clrs['false']);
        
        // Deseleccionamos el resultado de sí tomarlo
        if(ui.obtenerResultadoArea(i-1, j-valor_tomado) === 'T')
            ui.colorearCelda(i-1, j-valor_tomado, this.clrs['true']);
        else
            ui.colorearCelda(i-1, j-valor_tomado, this.clrs['false']);
        
    }

    /**
     * Función que le establece a una celda si es que cumplió la suma o no
     * @param {int} indice Indice del arreglo que se va a representar en la tabla
     * @param {int} n Valor de suma en la que se va a buscar el arreglo
     * @param {boolean} resultado Resultado que representa si fue verdadero o falso
     */
    establecerResultado(indice, n, resultado){
        const i = indice + 1;
        const j = n;

        if(resultado) { // Si la cumplió
            ui.colorearCelda(i, j, this.clrs['true']);
            ui.establecerTexto(i, j, "T");
        } else{ // Si no la cumplió
            ui.colorearCelda(i, j, this.clrs['false']);
            ui.establecerTexto(i, j, "F");
        }
    }
    /**
     * Función que devuelve el color a los índices el elemento que fue agregado
     * @param {int} indice Indice del arreglo que se va a representar en la tabla
     * @param {int} n Valor de suma en la que se va a buscar el arreglo
     */
    limpiarIndices(indice, n){
        const i = indice + 1;
        const j = n;

        ui.colorearCelda(-1, j, this.clrs['indice']);
        ui.colorearCelda(i, -1, this.clrs['indice']);
    }

}

// const tablita = new Tabla([10, 5, 8, 2], 7);
// const ui = new UI(tablita);

// tablita.generarCelda(-1, 0);
// tablita.comparar(-1, 0, 0);
// tablita.limpiarComparacion(-1, 0, 0);
// tablita.establecerResultado(-1, 0, false);
// tablita.limpiarIndices(-1, 0); 
