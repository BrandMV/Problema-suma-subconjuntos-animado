

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
