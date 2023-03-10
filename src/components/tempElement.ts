import { Obj } from "../ts/types"

//handle temperature html element
const tempEl = document.querySelector('#temp-el') as HTMLSpanElement;
const tempBtn = document.querySelector('#temp-toggle-btn') as HTMLButtonElement;

function kelvinToC(kelvin: number) {
    return kelvin - 273.15
}

function kelvinToF(kelvin: number) {
    return (kelvin - 273.15) * 1.8 + 32
}

export function addTempEl(temp: Obj) {
    if(temp.c) {
        tempEl.innerText = `${kelvinToC(temp.value).toFixed(1)}°`
        tempBtn.innerText = 'F°'
    } else if(temp.f) {
        tempEl.innerText = `${kelvinToF(temp.value).toFixed(1)}°`
        tempBtn.innerText = 'C°'
    }
}

export function swapUnit(temp: Obj){
    if (temp.value == '') return
    if (temp.c) {
        temp.c = false;
        temp.f = true;
    } else if (temp.f) {
        temp.c = true;
        temp.f = false;
    };
    addTempEl(temp)
}