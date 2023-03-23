import World from './3d/World';

import search from './api/search';

import { createUl } from './components/searchList';
import { addTempEl, swapUnit } from './components/tempElement';
import { epochTo24Hour } from './utils/epoch';

import { inputFail } from './utils/inputFail';

//load threejs scene
const threeApp = new World()
threeApp.init()

// handle searching weather
const locInput = document.querySelector('.location-input') as HTMLInputElement;
const submitBtn = document.querySelector('#submit-btn') as HTMLButtonElement;
let searching = false;

//store timers
let setIntervalRef: Array<any> = [];

submitBtn.addEventListener('click', async function () {
    if (searching) return
    searching = true

    let input = locInput.value;
    let country = '';

    //if ul res already exists
    if (document.querySelector('.response-wrap')) document.querySelector('.response-wrap')?.remove();

    //clear timers
    if(setIntervalRef.length > 0){
        setIntervalRef.forEach(interval =>{
            clearInterval(interval)
        })
    }

    //if user specify country
    if (locInput.value.includes(',')) {
        country = input.slice(input.indexOf(',') + 1, input.length)
        country = country.trimStart()
        input = input.slice(0, input.indexOf(','))
    }

    const city = await search(input);

    if (city.error){
        inputFail(city)
    } else {
        locInput.placeholder = 'City';
        createUl(city, country)
        .then((value) => {
            updateDOM(value)
            threeApp.weatherAnimation(value.weather[0].icon);
            threeApp.rotateEarth(value.coord.lat, value.coord.lon);
        })
        .catch((error) => {console.log(error)});
    }
    searching = false
});

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

//update HTML elements 
const locationEl = document.querySelector('#location-el') as HTMLSpanElement;
const weatherEl = document.querySelector('#weather-el') as HTMLSpanElement;
const timeEl = document.querySelector('#time-el') as HTMLSpanElement;
const updateTimeEl = document.querySelector('#update-time') as HTMLSpanElement;
const updateWrap = document.querySelector('.update-wrap') as HTMLDivElement;

function updateDOM(value: any){
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
    updateTimeEl.innerText = epochTo24Hour(value.dt+value.timezone)
    if(updateWrap.style.opacity == '') updateWrap.style.opacity = '1';

    //current time
    //set time ms to s
    const time = new Date().getTime()/1000;
    timeEl.innerText = epochTo24Hour(time+value.timezone)
    
    const tick = setInterval(()=>{
        const time = new Date().getTime()/1000;
        if(timeEl.innerText === epochTo24Hour(time+value.timezone)) return
        timeEl.innerText = epochTo24Hour(time+value.timezone)
    }, 1000)
    setIntervalRef.push(tick)
}