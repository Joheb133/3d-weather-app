import * as THREE from 'three';

//SETUP: renderer, scene & camera
const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize(innerWidth, innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, innerWidth/innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);
scene.add(camera);

//lighting
const ambLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambLight);

//test cube
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
    color: 0xfff
}));
scene.add(cube);

//resize
window.addEventListener("resize", ()=>{
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
})

//animator
function animator(){
    requestAnimationFrame(animator);

    cube.rotation.x += 0.0025;
    cube.rotation.y -= 0.0025;
    cube.rotation.z += 0.0025;

    renderer.render(scene, camera);
}

animator();