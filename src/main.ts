import scene from './3d/scene';
import Earth from './3d/components/earth';
import updateEarthRotation from './3d/utils/earthRotation';
import search from './api/search';
import { createUl, removeUl} from './utils/searchList';

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

submitBtn.addEventListener("click", async function() {
    //if ul res already exists
    if(document.querySelector('.response')) {
        removeUl();
    }

    const city = await search(locInput.value);

    if(city.error === 'city not found') {
        locInput.placeholder = city.error
        locInput.value = '';
    } else if(city.error) {
        console.error(city)
        locInput.placeholder = 'Server error'
        locInput.value = '';
    } else {
        locInput.placeholder = 'City';
        createUl(city).then((value)=>{
            const coords = value as {[key: string]: number}
            updateEarthRotation(myScene.camera, coords.lat, coords.lon, 6)
        });
    }
});

