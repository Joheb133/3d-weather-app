import * as THREE from 'three';
import { Object3D } from 'three';

//create threejs scene
export default class scene {
    private scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

    constructor() {
        const scene = this.scene;
        const camera = this.camera;
        /* SETUP: renderer, scene & camera */
        const canvas = document.querySelector("canvas") as HTMLCanvasElement;
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
        renderer.setSize(innerWidth, innerHeight);

        camera.position.set(12, 0, 0);
        camera.lookAt(0, 0, 0)
        scene.add(camera);

        /* lighting */
        const ambLight = new THREE.AmbientLight(0xffffff, 0.1)
        const dirLight = new THREE.DirectionalLight(0xffffff, 1)
        dirLight.position.set(10, 10, 10)
        scene.add(ambLight, dirLight);

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
    }

    add(object: Object3D | THREE.Mesh) {
        this.scene.add(object)
    }
}