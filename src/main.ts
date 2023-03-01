import World from './3d/World';
import search from './api/search';

import { createUl } from './components/searchList';
import { addTempEl, swapUnit } from './components/tempElement';


const threeContainer = document.querySelector('.three-container') as HTMLDivElement;

//load threejs scene
const threeApp = new World(threeContainer)
await threeApp.init()

//add weather models to scene
// interface Obj3ds {
//     group: THREE.Group,
//     obj: {[key: string]: THREE.Object3D}
// }

// let obj3ds: Obj3ds = {
//     group: new THREE.Group(),
//     obj: {}
// }

// const dictionary: { [key: string]: any } = {
//     'sun': '01',
//     'sun_cloud': '02',
//     'cloud': '03',
//     'clouds': '04',
//     'rain_cloud': '09',
//     'rain_sun': '10',
//     'thunder': '11',
//     'snow': '13',
//     'mist': '50'
// }

// const objectLoader = new THREE.ObjectLoader()
// objectLoader.load('data/model.json', function (obj) {
//     const children = obj.children

//     children.forEach(element => {
//         element.scale.set(0.15, 0.15, 0.15)
//         element.position.set(0, 0, 0)
//         //obj key = (dictionary value = element name) : value = element
//         obj3ds.obj[dictionary[element.name]] = element
//     })
//     obj3ds.group.children = children
//     obj3ds.group.name = 'weather';
//     //myScene.add(obj3ds.group);
// })

// function moveIcon(no: string, lat: number, lon: number) {
//     //reset asset positions
//     for(const key in obj3ds.obj) {
//         obj3ds.obj[key].position.set(0, 0, 0);
//     }

//     //format res icon string
//     no = no.replace(no.charAt(2), '')

//     rotateAroundSphere(obj3ds.obj[no], lat, lon, 0.5, false)

// }


// handle searching weather
const locInput = document.getElementById('location-input') as HTMLInputElement;
const submitBtn = document.getElementById('submit-button') as HTMLButtonElement;
let searching = false;

let temp = {
    c: true,
    f: false,
    value: '' as any
}

submitBtn.addEventListener('click', async function () {
    if (searching) return
    searching = true

    let input = locInput.value;
    let country = '';
    //if ul res already exists
    if (document.querySelector('.response')) {
        document.querySelector('.response')?.remove();
    }

    //if user specify country
    if (locInput.value.includes(',')) {
        country = input.slice(input.indexOf(',') + 1, input.length)
        country = country.trimStart()
        input = input.slice(0, input.indexOf(','))
    }

    const city = await search(input);

    if (city.error === 'city not found') {
        locInput.placeholder = city.error
        locInput.value = '';
    } else if (city.error) {
        console.error(city)
        locInput.placeholder = 'Server error'
        locInput.value = '';
    } else {
        locInput.placeholder = 'City';
        createUl(city, country).then((value) => {
            locInput.value = '';
            temp.value = value.main.temp
            addTempEl(temp);
            //moveIcon(value.weather[0].icon, value.coord.lat, value.coord.lon);
            threeApp.camAroundSphere(value.coord.lat, value.coord.lon, 3);
        }).catch((error) => {
            console.log(error)
        });
    }
    searching = false
});

//temperature conversion
const tempBtn = document.querySelector('#temp-toggle-btn') as HTMLButtonElement;

tempBtn.addEventListener("click", () => {
    swapUnit(temp)
})