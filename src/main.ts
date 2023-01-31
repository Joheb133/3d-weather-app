import * as THREE from 'three';
import { Object3D } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

/* SETUP: renderer, scene & camera */
const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(innerWidth, innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);
camera.lookAt(0, 0, 0)
scene.add(camera);

/* lighting */
const ambLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambLight);

/* load earth gltf model */
let earth: Object3D;
async function loadEarthModel() {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
        loader.load('/earth_globe/scene.gltf', (gltf) => {
            resolve(gltf.scene);
        }, undefined, reject);
    });
};
const modelPromise = loadEarthModel() as Promise<Object3D>;

//after earth loads
modelPromise.then(model => {
    earth = model as Object3D
    objectCenter(earth)
    scene.add(earth)
    animator();
}).catch(error => { console.log(`Error loading model: ${error}`) })

//set object center
function objectCenter(object:Object3D) {
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());

    object.position.x += (object.position.x - center.x);
    object.position.y += (object.position.y - center.y);
    object.position.z += (object.position.z - center.z);
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
    earth.rotation.y += 0.00025
}