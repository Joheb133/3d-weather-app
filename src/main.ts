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
let earth: {[k:string]: any} = {}
function loadEarthModel(){
    const textureLoader = new THREE.TextureLoader();
    const textures = {
        map: textureLoader.load('earth_day/textures/earthday_baseColor.jpg'),
        metallic: textureLoader.load('earth_day/textures/earthday_metallicRoughness.jpg'),
        roughness: textureLoader.load('earth_day/textures/earthday_clearcoat-earthday_clearcoat_roughness.png'),
        normal: textureLoader.load('earth_day/textures/earthday_normal.png')
    }

    const model = new THREE.Mesh(new THREE.SphereGeometry(6.371, 128, 128), new THREE.MeshStandardMaterial({
        map: textures.map,
        metalnessMap: textures.metallic,
        roughnessMap: textures.roughness,
        normalMap: textures.normal
    }))

    console.log(model)

    earth.radius = 6.371;
    earth.model = model;

    scene.add(model)
}
loadEarthModel()

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
    console.log(pos)

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

const latInput = document.getElementById("lat-input") as HTMLInputElement;
const lonInput = document.getElementById("lon-input") as HTMLInputElement;
const submitBtn = document.getElementById("submit-button") as HTMLButtonElement;

submitBtn.addEventListener("click", () => {
    const longitude = parseFloat(lonInput.value);
    const latitude = parseFloat(latInput.value);
    updateEarthRotation(latitude, longitude, earth.radius);
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
animator();