import World from './3d/World';

import search from './api/search';

import { createUl } from './components/searchList';
import { updateDOM } from './components/updatePage';

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
            updateDOM(value, setIntervalRef)
            threeApp.weatherAnimation(value.weather[0].icon);
            threeApp.rotateEarth(value.coord.lat, value.coord.lon);
        })
        .catch((error) => {console.log(error)});
    }
    searching = false
});