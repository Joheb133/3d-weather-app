import { gsap } from 'gsap';
import { Object3D } from 'three';

// Define a function to update the camera's position
export default function rotateAroundSphere(object: Object3D, lat: number, lon: number, radius: number, animate: boolean = true) {
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

    if(animate) {
        gsap.to(object.position, {
            x: pos.x, y: pos.y, z: pos.z,
            duration: 2,
            onUpdate: () => {
                object.lookAt(0, 0, 0)
            },
            ease: 'power2'
        })
    } else {
        object.position.set(pos.x, pos.y, pos.z)
        object.lookAt(0, 0, 0)
    }
}