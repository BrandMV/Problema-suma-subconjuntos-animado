import {
    UI,
    Arbol,
    agregarNodo
} from './brute-force-animation.js';


// Creamos el nodo raiz e inicializamos el canvas
export const ui = new UI();
export var root;
let retardo;
let id;
export let apuntadores_nivel;

export async function main(obj) {
    // Inizalizamos el apuntador de nivel y los id's
    apuntadores_nivel = {
        "0": 1,
        "1": 2,
        "2": 4,
        "3": 8,
        "4": 16,
    }
    id = 1;

    // Creamos el nodo raiz y lo mostramos
    root = new Arbol("", 0, "(" + obj.valores.length + "," + obj.suma + ")", 0);
    ui.mostrarNodo(root);

    // Obtenemos el tiempo de retardo
    retardo = obj.velocidad * 1000;

    // Mandamos a llamar al algoritmo
    const resultado = await esSumaConjunto(obj.valores, obj.valores.length, obj.suma, root);

    // Mostramos el resultado final
    if(resultado){
        ui.mostrarPaso(`Se completó la suma señores B) mi trabajo aquí ha terminado.`);
        root.establecerResultadoFinal("bg-success");
    } else {
        ui.mostrarPaso(`No se completó la suma ): intenta de nuevo.`);
        root.establecerResultadoFinal("bg-danger");
    }
    

    // Habilitamos el botón de simular
}

// Función síncrona
async function esSumaConjunto(set, n, sum, nodo) {
    let resultado;

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(1);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Nueva llamada con a: [${set}], n: ${n} y sum: ${sum}.`);
    /*--------Retardo--------*/
    await sleep(retardo / 4);


    // SI SE COMPLETÓ LA SUMA DEL ALGORITMO

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(2);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Comprobando si se completó la suma...`);
    /*--------Retardo--------*/
    await sleep(retardo / 4); 

    if (sum == 0) {
        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, true);

        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(3);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Se completó la suma. :)`);
        /*--------Retardo--------*/
        await sleep(retardo / 4); 

        return true;
    }

    // SI YA NO HAY MÁS ELEMENTOS EN EL CONJUNTO

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(4);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Comprobando si aún quedan elementos por comparar...`);
    /*--------Retardo--------*/
    await sleep(retardo / 4); 

    if (sum < 0 || (n == 0 && sum != 0)) {
        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(5);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Ya no quedan más elementos. :(`);

        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, false);
        
        /*--------Retardo--------*/
        await sleep(retardo / 4);

        return false;
    }

    // SI EL ELEMENTO ACTUAL ES MAYOR A LA SUMA

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(6);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Comprobando si el elemento (${set[n-1]}) es mayor a la suma (${sum})...`);
    /*--------Retardo--------*/
    await sleep(retardo / 4);

    if (set[n - 1] > sum) {
        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(7);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Si es mayor, omitimos tomar el elemento actual.`);
        /*--------Retardo--------*/
        await sleep(retardo / 4); 

        /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
        id++;
        const nodo_der = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + sum + ")", "der"); // Agregamos el nodo
        resultado = await esSumaConjunto(set, n - 1, sum, nodo_der); // Esperamos la llamada recursiva
        
        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, resultado);
        ui.saltarEspHorizontal(nodo_der); // Saltamos una posición horizontal (el cuadro izquierdo que no ocupamos)

        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(7);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Devolvemos el resultado de no tomarlo (${resultado}).`);
        /*--------Retardo--------*/
        await sleep(retardo / 4); 

        return resultado;
    }

    // CONSIDERANDO NO TOMAR EL ELEMENTO ACTUAL

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(8);
    /*----Manejo de paso----*/
    ui.mostrarPaso(`Identificando qué sucede si no tomamos el elemento actual (${set[n - 1]})...`);
    /*--------Retardo--------*/
    await sleep(retardo / 4);

    /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
    id++;
    const nodo_der = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + sum + ")", "der"); // Agregamos el nodo
    resultado = await esSumaConjunto(set, n - 1, sum, nodo_der); // Esperamos la llamada recursiva

    /*----Manejo de linea----*/
    ui.limpiarInstrucciones();
    ui.destacarInstruccion(8);
    /*--------Retardo--------*/
    await sleep(retardo / 4); 

    if (resultado) {
        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, resultado);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Devolviendo el resultado de no tomarlo (${resultado}).`);
        /*--------Retardo--------*/
        await sleep(retardo / 4); 

        return resultado;
    }

    // SI NO TOMAMOS EL ELEMENTO ACTUAL Y DA FALSO, MANDAMO+S A TOMAR EL ELEMENTO ACTUAL
    else {         
        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(9);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`No tenemos la suma, consideramos tomar al elemento actual (${set[n - 1]}).`);
        /*--------Retardo--------*/
        await sleep(retardo / 4);

        /*-----------------------Manejo de árbol lógico y llamada recursiva-----------------------*/
        id++;
        const nodo_izq = agregarNodo(nodo, set[n - 1], id, "(" + (n - 1) + "," + (sum - set[n - 1]) + ")", "izq"); // Agregamos el nodo
        resultado = await esSumaConjunto(set, n - 1, sum - set[n - 1], nodo_izq) // Esperamos la llamada recursiva

        /*----------Manejo de nodo----------*/
        ui.establecerResultado(nodo.id, resultado);

        /*----Manejo de linea----*/
        ui.limpiarInstrucciones();
        ui.destacarInstruccion(9);
        /*----Manejo de paso----*/
        ui.mostrarPaso(`Devolviendo el resultado de tomarlo (${resultado})...`);
        /*--------Retardo--------*/
        await sleep(retardo / 4); 

        return resultado;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}