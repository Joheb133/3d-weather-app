import { Scene, Color } from "three";

export function createScene(envMap?: THREE.DataTexture){
    const scene = new Scene();
    scene.background = new Color(0x3a76f0)
    if(envMap) {
        scene.environment = envMap;
    }

    return scene
}