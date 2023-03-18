import { PointLight } from "three";

export function createLight() {
    //light
    const light = new PointLight(0xffffff, 0.7, 100);
    light.position.set(0, 0, -10);

    //shadow settings
    light.castShadow = true;
    light.shadow.mapSize.width = 1024*2;
    light.shadow.mapSize.height = 1024*2;
    light.shadow.radius = 5;

    return light
}