import scene from './3d/scene';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ObjectLoader } from 'three';
import rotateAroundSphere from './3d/utils/earthRotation';
import search from './api/search';
import {createUl} from './utils/searchList';


//load scene
const myScene = new scene();

//load earth
const gltfLoader = new GLTFLoader();
gltfLoader.load( 'models/earth-low-poly_lq/earth.gltf', function ( gltf ) {
    gltf.scene.visible = false
    gltf.scene.name = 'earth'
	myScene.add(gltf.scene)
}, undefined, function ( error ) {
	console.error( error );
});

//add weather models to scene
let obj3ds: { [key: string]: any } = {
    obj: {}
}

const dictionary: { [key: string]: any } = {
    'sun': '01',
    'sun_cloud': '02',
    'cloud': '03',
    'clouds': '04',
    'rain_cloud': '09',
    'rain_sun': '10',
    'thunder': '11',
    'snow': '13',
    'mist': '50'
}

const objectLoader = new ObjectLoader()
objectLoader.load("data/model.json", function (obj) {
    const children = obj.children
    
    children.forEach(element => {
        //obj key = (dictionary value = element name) : value = element
        obj3ds.obj[dictionary[element.name]] = element
    })

    obj3ds.group = obj as THREE.Group
    myScene.add(obj3ds.group)
})



// handle searching weather
const locInput = document.getElementById("location-input") as HTMLInputElement;
const submitBtn = document.getElementById("submit-button") as HTMLButtonElement;
const tempEl = document.querySelector('#temp-el') as HTMLSpanElement;
let searching = false;

submitBtn.addEventListener("click", async function() {
    if(searching) return
    searching = true

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
            temp.value = value.main.temp
            addTempEl();
            rotateAroundSphere(myScene.camera, value.coord.lat, value.coord.lon, 6)
        }).catch((error)=>{
            console.log(error)
        });
    }

    searching = false
});

//temperature conversion
const tempBtn = document.querySelector("#temp-toggle-btn") as HTMLButtonElement;
let temp = {
    c: true,
    f: false,
    value: "" as any
}

tempBtn.addEventListener("click", ()=>{
    if(temp.value == "") return 
    if(temp.c) {
        temp.c = false;
        temp.f = true;
    } else if(temp.f) {
        temp.c = true;
        temp.f = false;
    };
    addTempEl();
})

function addTempEl() {
    if(temp.c) {
        tempEl.innerText = `${kelvinToC(temp.value).toFixed(1)}°`
        tempBtn.innerText = 'F°'
    } else if(temp.f) {
        tempEl.innerText = `${kelvinToF(temp.value).toFixed(1)}°`
        tempBtn.innerText = 'C°'
    }
}

function kelvinToC(kelvin: number) {
    return kelvin - 273.15
}

function kelvinToF(kelvin: number) {
    return (kelvin - 273.15) * 1.8 + 32
}
