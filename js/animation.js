const txtNum = document.getElementById("output");
const bRange = document.getElementById("bRange");

bRange.addEventListener("input", function() {
    txtNum.textContent = bRange.value + "s";
});

const arreglo = [];
const agregarI = document.getElementById("agregar-arreglo");
const contenedor = document.querySelector('#contenedor-arreglo');

const inpTxt = document.querySelector(".input-num");
const tamArr = document.getElementById("numArr");

agregarI.addEventListener("click", function() {

    tamArr.textContent = "n: " + arreglo.length;
    var nuevo_valor = document.createElement('div');
    nuevo_valor.className = "bd-highlight d-flex justify-content-start m-1 w-100 align-items-center";

    

    nuevo_valor.innerHTML = `<input type="number" class="input-num text-center w-75" value="1" min="1" name="array[]">
    <div class="bg-danger b-redondeado px-2 fs-2 minus">
        <p class="text-white fw-bolder minus">-</p>
    </div>`;

    contenedor.insertBefore(nuevo_valor, agregarI);
});