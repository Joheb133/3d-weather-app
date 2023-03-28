//updates the page after getting a response from weather API

import { epochTo24Hour } from "../utils/epoch";
import { returnTimeZone } from "../utils/timeZone";
import { addTempEl, swapUnit } from "./tempElement";

//update HTML elements 
const locInput = document.querySelector('.location-input') as HTMLInputElement;
const locationEl = document.querySelector('#location-el') as HTMLSpanElement;
const weatherEl = document.querySelector('#weather-el') as HTMLSpanElement;
const timeEl = document.querySelector('#time-el') as HTMLSpanElement;
const updateTimeEl = document.querySelector('#update-time') as HTMLSpanElement;
const updateWrap = document.querySelector('.update-wrap') as HTMLDivElement;

//temp button listener
let temp = {
    c: true,
    f: false,
    value: '' as any
}
const tempBtn = document.querySelector('#temp-toggle-btn') as HTMLButtonElement;
tempBtn.addEventListener("click", () => {
    swapUnit(temp)
})

export function updateDOM(value: any, tickList?: Array<any>){
    //update DOM elements
    //input
    locInput.value = '';

    //temperature
    temp.value = value.main.temp
    addTempEl(temp);

    //location
    locationEl.innerText = value.name

    //weather
    weatherEl.innerText = value.weather[0].main

    //last updated in local time
    updateTimeEl.innerText = `${epochTo24Hour(value.dt+value.timezone)} ${returnTimeZone(value.timezone)}`
    if(updateWrap.style.opacity == '') updateWrap.style.opacity = '1';

    //current time + timezone
    //set time ms to s
    const time = new Date().getTime()/1000;
    timeEl.innerText = epochTo24Hour(time+value.timezone)

    //create timer if timer reference list provided
    if(tickList) {
        const tick = setInterval(()=>{
            const time = new Date().getTime()/1000;
            if(timeEl.innerText === epochTo24Hour(time+value.timezone)) return
            timeEl.innerText = epochTo24Hour(time+value.timezone)
        }, 1000)
        tickList.push(tick)
    }
}