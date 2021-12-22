/*****************************************************************
	Archivo principal de sitio
	Este programa se encarga de manejar la interacción a rasgos generales del
    sitio y sobre todo del manejo de la barra de navegación superior.
	
    Fecha: 20/12/2021
	Version: Final 1.0 
	Autores:
			-Martinez Ruiz Alfredo
			-Mendez Castañeda Aurora
			-Mendez Hipolito Emilio
			-Meza Vargas Brandon David

*****************************************************************/
/*-----------------------Variables principales para el DOM----------------*/
const navItem1 = document.getElementById("inicio")
const navItem2 = document.getElementById("algoritmo")
const navItem3 = document.getElementById("explicacion")
const navItem4 = document.getElementById("animacion")

/*--------------------Listeners para cada botón del navbar--------------*/
navItem1.addEventListener('click', e => {
    navItem1.classList.add('ia-active')
    navItem2.classList.remove('active')
    navItem3.classList.remove('active')
    navItem4.classList.remove('ia-active')
    e.stopPropagation();
    manejarSecciones(e.target.id);
})
navItem2.addEventListener('click', e => {
    navItem1.classList.remove('ia-active')
    navItem2.classList.add('active')
    navItem3.classList.remove('active')
    navItem4.classList.remove('ia-active')
    e.stopPropagation();
    manejarSecciones(e.target.id);
})
navItem3.addEventListener('click', e => {
    navItem1.classList.remove('ia-active')
    navItem2.classList.remove('active')
    navItem3.classList.add('active')
    navItem4.classList.remove('ia-active')
    e.stopPropagation();
    manejarSecciones(e.target.id);
})
navItem4.addEventListener('click', e => {
    navItem1.classList.remove('ia-active')
    navItem2.classList.remove('active')
    navItem3.classList.remove('active')
    navItem4.classList.add('ia-active')
    e.stopPropagation();
    manejarSecciones(e.target.id);
})

/** 
 * Función que se encargará de mostrar cada pestaña de código en fuerza bruta
 * @param {string} leng lenguaje de programacion seleccionado
 * @returns No retorna nada
*/
const openCode = (leng) => {
    let btn = leng + "-btn"
    console.log(btn);
    let i
    let code = document.getElementsByClassName("codigo")
    let codebtn = document.getElementsByClassName("codigo-btn")
    for (i = 0; i < code.length; i++) {
        code[i].style.display = "none"

    }
    for (i = 0; i < codebtn.length; i++) {
        codebtn[i].setAttribute('style', "background: white;")

    }
    document.getElementById(btn).setAttribute('style', "border-bottom: none;background: var(--morningGlory);")


    document.getElementById(leng).style.display = "block"
}

/** 
 * Función que se encargará de mostrar cada pestaña de código en Dp bottom-up
 * @param {string} leng lenguaje de programacion seleccionado
 * @returns No retorna nada
*/
const openCodeDP = (leng) => {
    let btn = leng + "-btn"
    console.log(btn);
    let i
    let code = document.getElementsByClassName("codigo-dp")
    let codebtn = document.getElementsByClassName("codigo-btn-dp")
    for (i = 0; i < code.length; i++) {
        code[i].style.display = "none"

    }
    for (i = 0; i < codebtn.length; i++) {
        codebtn[i].setAttribute('style', "background: white;")

    }
    document.getElementById(btn).setAttribute('style', "border-bottom: none;background: var(--morningGlory);")


    document.getElementById(leng).style.display = "block"
}

/** 
 * Función que se encargará de mostrar cada pestaña de código en Dp top-down
 * @param {string} leng lenguaje de programacion seleccionado
 * @returns No retorna nada
*/
const openCodeDPTD = (leng) => {
    let btn = leng + "-btn"
    console.log(btn);
    let i
    let code = document.getElementsByClassName("codigo-dp2")
    let codebtn = document.getElementsByClassName("codigo-btn-dp2")
    for (i = 0; i < code.length; i++) {
        code[i].style.display = "none"

    }
    for (i = 0; i < codebtn.length; i++) {
        codebtn[i].setAttribute('style', "background: white;")

    }
    document.getElementById(btn).setAttribute('style', "border-bottom: none;background: var(--morningGlory);")


    document.getElementById(leng).style.display = "block"
}

/**
 * Función que relaciona y maneja las secciones de cada pestaña
 * @param {String} seccion_id Este valor es el nombre de la seccion que se quiere mostrar
 */
function manejarSecciones(seccion_id){
    const dict_secciones = {
        "inicio": "inicio-seccion",
        "algoritmo": "algoritmo-seccion",
        "explicacion": "explicacion-seccion",
        "animacion": "animacion-seccion"
    };

    // Ocultamos las demas secciones
    for (const entry in dict_secciones){
        document.getElementById(dict_secciones[entry]).classList.add('d-none');
    }
    // Mostramos la sección seleccionada
    document.getElementById(dict_secciones[seccion_id]).classList.remove('d-none');

    // Ocultamos el canvas
    if(document.querySelector("#panel-animado")){
        document.querySelector("#panel-animado").classList.add('d-none');
    }

    // En otras secciones ponemos el footer
    document.querySelector("footer").classList.remove('d-none');
    
    // En inicio quitamos el footer
    if(seccion_id === "inicio"){
        document.querySelector("footer").classList.add('d-none');
        return;
    } 
    
    // Mostramos el canvas si está declarado el nodo raíz
    if(seccion_id === "animacion"){
        const nodo_raiz = document.querySelector("#level-0 .nodo");
        if(nodo_raiz.firstElementChild)
            document.querySelector("#panel-animado").classList.remove('d-none'); 
        
    }
}

/**
 * Función de un solo uso que inicia la sección de inicio
*/
(function(){
    manejarSecciones('inicio');
})();

/** 
 * Función que para viajar a la seccion de animacion desde
 * la sección de explicación
 * @param ninguno
 * @returns No retorna nada
*/
function ir_Animacion(){
    navItem1.classList.remove('ia-active')
    navItem2.classList.remove('active')
    navItem3.classList.remove('active')
    navItem4.classList.add('ia-active')
      manejarSecciones('animacion');
   
}
/** 
 * Función que se encargará de mostrar el texto completo de 
 * la explicacion del algoritmo por fuerza bruta
 * @param {string} id opcion seleccionada (mas/menos)
 * @returns No retorna nada
*/
function verMas(id){
    if(id=="mas"){
    document.getElementById("desplegar").style.display="block";   
    document.getElementById("mas").style.display="none"; 
    }
    else{
    document.getElementById("desplegar").style.display="none";
    document.getElementById("mas").style.display="inline";
    }

}
/** 
 * Función que se encargará de mostrar el texto completo de 
 * la explicacion del algoritmo Top Down
 * @param {string} id opcion seleccionada (mas/menos)
 * @returns No retorna nada
*/
function verMas1(id){
    if(id=="mas"){
    document.getElementById("desplegar1").style.display="block";   
    document.getElementById("mas1").style.display="none"; 
    }
    else{
    document.getElementById("desplegar1").style.display="none";
    document.getElementById("mas1").style.display="inline";
    }

}
/** 
 * Función que se encargará de mostrar el texto completo de 
 * la explicacion del algoritmo Bottom Up
 * @param {string} id opcion seleccionada (mas/menos)
 * @returns No retorna nada
*/
function verMas2(id){
    if(id=="mas"){
    document.getElementById("desplegar2").style.display="block";   
    document.getElementById("mas2").style.display="none"; 
    }
    else{
    document.getElementById("desplegar2").style.display="none";
    document.getElementById("mas2").style.display="inline";
    }

}

/* Manejo de pop-overs */
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})
