import { PerspectiveCamera } from "three";

export function createCamera() {
    const camera = new PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(-2, -2.6, -9.3)//-1.7, -2.6, -9.7
    camera.rotation.set(-3.91, -0.62, -2.99)

    //debugCamera(camera)
    return camera
}

// rudamentery camera controller for debugging
/* function debugCamera(camera: THREE.PerspectiveCamera) {
    const btnEl = document.createElement('button');
    btnEl.innerText = 'freeMove OFF';
    btnEl.id = 'camBtn'
    Object.assign(btnEl.style, {
        position: 'absolute',
        top: '50%',
        right: '0',
        padding: '4px',
        margin: '16px'
    })
    document.body.appendChild(btnEl)

    let debug = false;

    //toggle btn
    const btn = document.querySelector('#camBtn') as HTMLButtonElement;
    btn.addEventListener('click', () => {
        if (debug) {
            debug = false;
            btn.innerText = 'freeMove OFF'
            console.log(camera.position, camera.rotation)
        } else {
            debug = true;
            btn.innerText = 'freeMove ON'
        }
    })

    //cam controls
    //positions and rotations will need to be configured depending on scenes
    window.addEventListener('keydown', (event) => {
        if (!debug) return

        //position
        switch (event.key.toLowerCase()) {
            case 'w':
                camera.position.z += 0.1
                break;
            case 's':
                camera.position.z -= 0.1
                break;
            case 'a':
                camera.position.x += 0.1;
                break;
            case 'd':
                camera.position.x -= 0.1
                break;
            case ' ':
                camera.position.y += 0.1
                break
            case 'control':
                camera.position.y -= 0.1
                break
        }

        //rotation
        switch (event.key.toLocaleLowerCase()){
            //yaw
            case 'q':
                camera.rotation.z -= 0.05
                break;
            case 'e':
                camera.rotation.z += 0.05
                break
            //left/right
            case 'arrowup':
                camera.rotation.x -= 0.01
                break
            case 'arrowdown':
                camera.rotation.x += 0.01
                break
            case 'arrowleft':
                camera.rotation.y -= 0.01
                break
            case 'arrowright':
                camera.rotation.y += 0.01
                break
        }
    })
} */