const navItem1 = document.getElementById("inicio")
const navItem2 = document.getElementById("algoritmo")
const navItem3 = document.getElementById("explicacion")
const navItem4 = document.getElementById("animacion")
navItem1.addEventListener('click', e => {
    navItem1.classList.add('ia-active')
    navItem2.classList.remove('active')
    navItem3.classList.remove('active')
    navItem4.classList.remove('ia-active')

})
navItem2.addEventListener('click', e => {
    navItem1.classList.remove('ia-active')
    navItem2.classList.add('active')
    navItem3.classList.remove('active')
    navItem4.classList.remove('ia-active')
})
navItem3.addEventListener('click', e => {
    navItem1.classList.remove('ia-active')
    navItem2.classList.remove('active')
    navItem3.classList.add('active')
    navItem4.classList.remove('ia-active')
})
navItem4.addEventListener('click', e => {
    navItem1.classList.remove('ia-active')
    navItem2.classList.remove('active')
    navItem3.classList.remove('active')
    navItem4.classList.add('ia-active')
})

//*Para pestañas de códigos
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


