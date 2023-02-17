import scene from './3d/scene';
import Earth from './3d/components/earth';
import updateEarthRotation from './3d/utils/earthRotation';
import search from './api/search';
import { createUl} from './utils/searchList';

//load scene
const myScene = new scene();

//load earth
const earth = new Earth();
earth.init().then(()=>{
    myScene.add(earth.model!)
})

// handle searching weather
const locInput = document.getElementById("location-input") as HTMLInputElement;
const submitBtn = document.getElementById("submit-button") as HTMLButtonElement;
const tempEl = document.querySelector('#temp-el') as HTMLSpanElement;

submitBtn.addEventListener("click", async function() {
    let input = locInput.value;
    let country = "";
    //if ul res already exists
    if(document.querySelector('.response')) {
        document.querySelector('.response')?.remove();
    }

    //if user specify country
    if(locInput.value.includes(",")) {
        country = input.slice(input.indexOf(",")+1, input.length)
        country = country.trimStart()
        input = input.slice(0, input.indexOf(","))
    }

    const city = await search(input);

    if(city.error === 'city not found') {
        locInput.placeholder = city.error
        locInput.value = '';
    } else if(city.error) {
        console.error(city)
        locInput.placeholder = 'Server error'
        locInput.value = '';
    } else {
        locInput.placeholder = 'City';
        createUl(city, country).then((value)=>{
            locInput.value = '';
            tempEl.innerText = `${value.main.temp}°`
            updateEarthRotation(myScene.camera, value.coord.lat, value.coord.lon, 6)
        }).catch((error)=>{
            console.log(error)
        });
    }
    
});

