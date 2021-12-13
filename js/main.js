//*Obtenemos los elementos del navbar
const navItem1 = document.getElementById("inicio")
const navItem2 = document.getElementById("algoritmo")
const navItem3 = document.getElementById("explicacion")
const navItem4 = document.getElementById("animacion")
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

/* Para la navegación con el menú*/
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

// Configuramos la pantalla de inicio
(function(){
    manejarSecciones('inicio');
})();

//Funcion para el boton de ir a animacion en la seccion de animacion
function ir_Animacion(){
    navItem1.classList.remove('ia-active')
    navItem2.classList.remove('active')
    navItem3.classList.remove('active')
    navItem4.classList.add('ia-active')
      manejarSecciones('animacion');
   
}
//Funciones para los "leer mas" y "leer menos" de la sección Explicación
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

//*Popovers
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})