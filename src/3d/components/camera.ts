import { PerspectiveCamera } from "three";

export function createCamera(){
    const camera = new PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(0, 0, -20)
    camera.rotation.set(-Math.PI, 0, -Math.PI)

    return camera
}