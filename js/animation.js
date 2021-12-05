const txtNum = document.getElementById("output");
const bRange = document.getElementById("bRange");

txtNum.textContent = 1 + "s";

bRange.addEventListener("input", function() {
    txtNum.textContent = bRange.value + "s";
});

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