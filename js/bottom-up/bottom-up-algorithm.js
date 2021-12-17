import {
    UI,
    Tabla
} from './bottom-up-animation.js';


// Creamos el grid de la tabla
export let tabla;
export let ui;

let retardo;

export function main(obj) {
    tabla = new Tabla()
    ui = new UI();

    // Establecemos las tablas en los objetos
    tabla.establecerTabla(obj.valores, obj.suma);
    ui.establecerTabla(tabla);
    
    // Obtenemos el tiempo de retardo
    retardo = obj.velocidad * 1000;
    esSumaConjunto(obj.valores, obj.valores.length, obj.suma)

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
        await sleep(retardo/n);
        subconjunto[i][0] = true;

        tabla.generarCelda(i, 0);
        tabla.establecerResultado(i, 0, true);
        tabla.limpiarIndices(i, 0);  
    }

    //*Si la suma no es 0, pero el conjunto es vacío, se regresa false
    for (let j = 1; j <= sum; j++) {
        await sleep(retardo/sum);
        subconjunto[0][j] = false;

        tabla.generarCelda(0, j);
        tabla.establecerResultado(0, j, false);
        tabla.limpiarIndices(0, j); 
    }

    //*Se llena la tabla recorriendo la suma y los elementos del conjunto
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= sum; j++) {
            
            await sleep(retardo/2);
            tabla.generarCelda(i, j);
            //* Si el elemento actual es mayor al valor actual de la suma, copiamos el valor del
            //* caso anterior
            if (set[i - 1] > j) {
                tabla.copiarNumero(i, j);
                await sleep(retardo/2);
                tabla.limpiarCopiado(i, j);

                subconjunto[i][j] = subconjunto[i - 1][j];
            }

            //* Si el valor actual se la suma es mayor que el iesimo elemento
            //* hacemos or entre los casos previos y el caso de j-valor de la suma actual
            if(j >= set[i - 1]){
                tabla.comparar(i, j, set[i - 1]);
                await sleep(retardo);
                tabla.limpiarComparacion(i, j, set[i - 1]);

                subconjunto[i][j] = subconjunto[i-1][j] || subconjunto[i - 1][j - set[i - 1]];
            }
            
            tabla.establecerResultado(i, j, subconjunto[i][j]);
            tabla.limpiarIndices(i, j);
        }
    }
    
    tabla.establecerResultadoFinal();
    return subconjunto[n][sum]
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}