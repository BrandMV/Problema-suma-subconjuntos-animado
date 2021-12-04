const txtNum = document.getElementById("output");
const bRange = document.getElementById("bRange");

txtNum.textContent = 1 + "s";

bRange.addEventListener("change", function() {
    txtNum.textContent = bRange.value + "s";
});
/*
const agregarI = document.getElementById("agregarI");
const inpTxt = document.querySelector(".input-num");
const tamArr = document.getElementById("numArr");

var i = 1;

$("#agregarI").addEventListener("click", function() {

    i++;
    tamArr.textContent = i;

    //creacion del -
    var newDiv2 = document.createElement('div');
    newDiv2.classList('bg-danger', 'b-redondeado', 'px-2', 'fs-2', 'minus');
    var newMinus = document.createElement('p');
    newMinus.classList('text-white', 'fw-bolder', 'minus');
    newMinus.textContent = "-";

    newDiv2.appendChild(newMinus);

    //creación de input
    var newInput = document.createElement('input');
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('name', 'array[]')
    newInput.classList.add('mx-1', 'input-num', 'text-center');

    // creación de div
    var newDiv = document.createElement("div");
    newDiv.classList.add('bd-highlight', 'd-flex', 'justify-content-center', 'm1');

    newDiv.appendChild(newInput, newDiv2);



    newInput.value = i;

    $("#cont-arreglo").appendChild(newDiv);
});*/

const agregarI = document.getElementById("agregarI");
const inpTxt = document.querySelector(".input-num");
const tamArr = document.getElementById("numArr");

var i = 1;

$("#agregarI").addEventListener("click", function() {

    i++;
    tamArr.textContent = "n" + i;
    var newDiv = document.createElement('div');
    newDiv.innerHTML =
        '<div class="bd-highlight d-flex justify-content-center m-1">\
        <input type="number" class="mx-1 input-num text-center" value="1" min="1" name="array[]">\
        <div class="bg-danger b-redondeado px-2 fs-2 minus ">\
            <p class="text-white fw-bolder minus">-</p>\
        </div></div>';

    $("#cont-arreglo").appendChild(newDiv);
});

/*
var campos_max = 4; //max de 10 campos
var x = 0;

$('#agregarI').click(function(e) {
    e.preventDefault(); //prevenir novos clicks
    if (x < campos_max) {
        $('#cont-arreglo').append(
            '<div class=" bd-highlight d-flex justify-content-center m-1" >\
                <input type="number" class="mx-1 input-num text-center" value="1" min="1">\
                <div class="bg-danger b-redondeado px-2 fs-2 minus >"\
                    <p class="text-white fw-bolder minus remover_campo">-</p>\
                </div>\
            </div>');
        x++;
    }
});
// Remover o div anterior
$('#cont-arreglo').on("click", ".remover_campo", function(e) {
    e.preventDefault();
    $(this).parent('div').remove();
    x--;
});*/