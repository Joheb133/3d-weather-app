import { Obj } from "../ts/types";

const locInput = document.getElementById('location-input') as HTMLInputElement;

//handle input response error
export function inputFail(city: Obj){
    if (city.error === 'city not found') {
        locInput.placeholder = city.error
        locInput.value = '';
    } else {
        console.error(city)
        locInput.placeholder = 'Server error'
        locInput.value = '';
    }
}