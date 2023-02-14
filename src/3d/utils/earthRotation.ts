import { gsap } from 'gsap';
// Define a function to update the camera's position
export default function updateEarthRotation(camera: THREE.Camera, lat: number, lon: number, radius: number) {
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

    gsap.to(camera.position, {
        x: pos.x, y: pos.y, z: pos.z,
        duration: 2,
        onUpdate: () => {
            camera.lookAt(0, 0, 0)
        },
        ease: 'power2'
    })
}