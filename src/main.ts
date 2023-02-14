import scene from './3d/scene';
import Earth from './3d/components/earth';
import search from './api/search';

//load scene
const myScene = new scene();

//load earth
const earth = new Earth();
earth.init().then(()=>{
    myScene.add(earth.model!)
})

// Call the updateCameraPosition function when the user inputs longitude and latitude values
const locInput = document.getElementById("location-input") as HTMLInputElement;
const submitBtn = document.getElementById("submit-button") as HTMLButtonElement;

submitBtn.addEventListener("click", async function() {
    const city = await search(locInput.value);
    if(city.error){
        console.error(city.error);
    } else {
        console.log(city)
    }
});