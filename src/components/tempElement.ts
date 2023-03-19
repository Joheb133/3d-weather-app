import { Obj } from "../ts/types"

//handle temperature html element
const tempEl = document.querySelector('#temp-el') as HTMLSpanElement;
const tempBtn = document.querySelector('#temp-toggle-btn') as HTMLButtonElement;
const spans = tempBtn.querySelectorAll('span');

function kelvinToC(kelvin: number) {
    return kelvin - 273.15
}

function kelvinToF(kelvin: number) {
    return (kelvin - 273.15) * 1.8 + 32
}

export function addTempEl(temp: Obj) {
    if(temp.c) {
        tempEl.innerText = `${kelvinToC(temp.value).toFixed(1)}°`
    } else if(temp.f) {
        tempEl.innerText = `${kelvinToF(temp.value).toFixed(1)}°`
    }
}

export function swapUnit(temp: Obj){
    spans[1].classList.toggle("active-temp")
    spans[0].classList.toggle("active-temp")
    if (temp.c) {
        temp.c = false;
        temp.f = true;
    } else if (temp.f) {
        temp.f = false;
        temp.c = true;
    };

    if (temp.value == '') return
    addTempEl(temp)
}