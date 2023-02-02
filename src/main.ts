import * as THREE from 'three';
import { Object3D } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';
/* SETUP: renderer, scene & camera */
const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(innerWidth, innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0)
scene.add(camera);

/* lighting */
const ambLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambLight);

/* earth model */
//load model
let earth: { [k: string]: any } = {}
async function loadEarthModel() {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
        loader.load('/earth_day/earth.gltf', (gltf) => {
            resolve(gltf.scene);
        }, undefined, reject);
    });
};
const modelPromise = loadEarthModel() as Promise<Object3D>;

//after earth loads
modelPromise.then(model => {
    console.log(model)
    earth.radius = getRadius(model)
    earth.model = model as Object3D

    scene.add(model)
    animator();
}).catch(error => { console.log(`Error loading model: ${error}`) })

//get radius
function getRadius(object: Object3D) {
    const box = new THREE.Box3().setFromObject(object)
    return box.max.x
}

// Define a function to update the camera's position
function updateEarthRotation(lat: number, lon: number, radius: number) {
    const radians = Math.PI / 180;
    // Convert the longitude and latitude values to radians
    const radLat = (90 - lat) * radians;
    const radLon= (lon + 180) * radians;

    const pos = {
        x: Math.cos(radLat) * Math.cos(radLon) * (radius+5),
        y: Math.sin(radLat) * (radius+5),
        z: Math.cos(radLat) * Math.sin(radLon) * (radius+5)
    }

    gsap.to(camera.position, {
        x: pos.x, y: pos.y, z: pos.z,
        duration: 1,
        onUpdate: ()=>{
            camera.lookAt(0, 0, 0)
        }
    })
}

// Call the updateCameraPosition function when the user inputs longitude and latitude values
//updateCameraPosition(51, -5, earth.radius)

const latInput = document.getElementById("lat-input") as HTMLInputElement;
const lonInput = document.getElementById("lon-input") as HTMLInputElement;
const submitBtn = document.getElementById("submit-button") as HTMLButtonElement;

submitBtn.addEventListener("click", () => {
    const longitude = parseFloat(lonInput.value);
    const latitude = parseFloat(latInput.value);
    updateEarthRotation(longitude, latitude, earth.radius);
});


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