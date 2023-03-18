import { Scene, Color } from "three";

export function createScene(){
    const scene = new Scene();
    scene.background = new Color(0x090909) // 0x3a76f0

    return scene
}