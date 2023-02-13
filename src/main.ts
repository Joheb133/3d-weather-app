import * as THREE from 'three';
import { gsap } from 'gsap';
/* SETUP: renderer, scene & camera */
const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(innerWidth, innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(12, 0, 0);
camera.lookAt(0, 0, 0)
scene.add(camera);

/* lighting */
const ambLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambLight);

//load model test
let earth: {[k:string]: any} = {radius: 6}

function loadEarthModel(){
    const textureLoader = new THREE.TextureLoader();
    const textures = {
        map: textureLoader.load('earth_day/textures/earthday_baseColor.jpg')
    }

    const model = new THREE.Mesh(new THREE.SphereGeometry(earth.radius, 128, 128), new THREE.MeshStandardMaterial({
        map: textures.map,
    }))

    scene.add(model)
    return model
}
earth.model = loadEarthModel()

// Define a function to update the camera's position
function updateEarthRotation(lat: number, lon: number, radius: number) {
    const radians = Math.PI / 180;
    const offset = 6;
    // Convert the longitude and latitude values to radians
    const radLat = (180 - lat) * radians;
    const radLon = (-lon + 180) * radians;

    const pos = {
        x: Math.cos(radLat) * Math.cos(radLon) * (radius+offset),
        y: Math.sin(radLat) * (radius+offset),
        z: Math.cos(radLat) * Math.sin(radLon) * (radius+offset),
    }

    gsap.to(camera.position, {
        x: pos.x, y: pos.y, z: pos.z,
        duration: 2,
        onUpdate: () => {
            camera.lookAt(0, 0, 0)
        },
        ease: 'power2'
    })
}

// Call the updateCameraPosition function when the user inputs longitude and latitude values
//updateCameraPosition(51, -5, earth.radius)

const locInput = document.getElementById("location-input") as HTMLInputElement;
const submitBtn = document.getElementById("submit-button") as HTMLButtonElement;

submitBtn.addEventListener("click", async function() {
    if(locInput.value == "") return
    const data = await getWeather(locInput.value);
    locInput.value = "";
    updateEarthRotation(data.coord.lat, data.coord.lon, earth.radius);
    console.log(data)
});

//weather api fetch requst
async function getWeather(location: string) {
    const res = await fetch(`http://127.0.0.1:5000/weather?q=${location}`)
    const data = await res.json();
    return data
}


/* resize */
window.addEventListener("resize", () => {
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
})

/* animator */
renderer.render(scene, camera);
function animator() {
    requestAnimationFrame(animator);
    renderer.render(scene, camera);
    //earth.model.rotation.y += 0.00025
}
animator();