import gsap from "gsap";
import { MathUtils } from "three";

export function rotateSphere(sphere: THREE.Mesh, lat: number, lon: number) {
    const radLat = MathUtils.degToRad(-lat);
    const radLon = MathUtils.degToRad(-lon);

    gsap.to(sphere.rotation, {
        x: radLat, 
        y: radLon,
        duration: 2,
        ease: 'power2',
    })
}