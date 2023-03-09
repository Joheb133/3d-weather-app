import { PerspectiveCamera } from "three";

export function createCamera(){
    const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, -10)
    camera.lookAt(0, 0, 0)

    return camera
}