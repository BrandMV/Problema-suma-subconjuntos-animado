import {
    UI,
    Tabla
} from './bottom-up-animation.js';


// Creamos el grid de la tabla
export const tabla = new Tabla();
export const ui = new UI();

let retardo;

export function main(obj) {
    // Establecemos las tablas en los objetos
    tabla.establecerTabla(obj.valores, obj.suma);
    ui.establecerTabla(tabla);
    
    // Obtenemos el tiempo de retardo
    retardo = obj.velocidad * 1000;
    esSumaConjunto(obj.valores, obj.valores.length, obj.suma)

    // Mandamos a llamar al algoritmo
    // tabla.generarCelda(-1, 0);
    // tabla.comparar(-1, 0, 0);
    // tabla.limpiarComparacion(-1, 0, 0);
    // tabla.establecerResultado(-1, 0, false);
    // tabla.limpiarIndices(-1, 0);   
}

// Función síncrona
async function esSumaConjunto(set, n, sum) {
   //* Se crea la tabla inicializando los valores del subconjunto[n+1][sum+1]
    let subconjunto = new Array(n + 1);

    for (let i = 0; i <= n; i++) {
        subconjunto[i] = new Array(sum + 1);
        for (let j = 0; j <= sum; j++) {
            subconjunto[i][j] = false;
        }
    }

    //* Si la suma a buscar es 0, se regresa true
    for (let i = 0; i <= n; i++) {
        await sleep(retardo/2);
        subconjunto[i][0] = true;
        tabla.generarCelda(i-1, 0);
        tabla.establecerResultado(i-1, 0, true);
        tabla.limpiarIndices(i-1, 0);  
    }

    //*Si la suma no es 0, pero el conjunto es vacío, se regresa false
    for (let j = 1; j <= sum; j++) {
        await sleep(retardo/2);
        subconjunto[0][j] = false;
        tabla.generarCelda(-1, j);
        tabla.establecerResultado(-1, j, false);
        tabla.limpiarIndices(-1, j); 
    }

    //*Se llena la tabla recorriendo la suma y los elementos del conjunto
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= sum; j++) {
            //* Si el elemento actual es mayor al valor actual de la suma, copiamos el valor del
            //* caso anterior
            if (set[i - 1] > j) {
                await sleep(retardo/2);
                subconjunto[i][j] = subconjunto[i - 1][j];
                tabla.generarCelda(i-1, j);
                tabla.establecerResultado(i-1, j, subconjunto[i - 1][j]);
                tabla.limpiarIndices(i-1, j);
            }

            //* Si el valor actual se la suma es mayor que el iesimo elemento
            //* hacemos or entre los casos previos y el caso de j-valor de la suma actual
            if(j >= set[i - 1]){
                await sleep(retardo/2);
                tabla.generarCelda(i-1, j);
                tabla.comparar(i-1, j, set[i - 1]);
                await sleep(retardo);
                tabla.limpiarComparacion(i-1, j, set[i - 1]);

                subconjunto[i][j] = subconjunto[i-1][j] || subconjunto[i - 1][j - set[i - 1]];
                tabla.establecerResultado(i-1, j, subconjunto[i][j]);
                tabla.limpiarIndices(i-1, j);
            }
        }
    }
    return subconjunto[n][sum];

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}