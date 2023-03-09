import {EffectComposer} from 'postprocessing'

export class Resizer {
    constructor(
        private camera: THREE.PerspectiveCamera,
        private renderer: THREE.WebGLRenderer, 
        private composer: EffectComposer) {

        this.setSize()

        //listen for container resize
        window.addEventListener('resize', () => {
            this.setSize();
        })
    }

    setSize() {
        //set camera aspect ratio
        this.camera.aspect = innerWidth / innerHeight

        //call project matrix to update camera
        this.camera.updateProjectionMatrix()

        //update renderer size
        this.renderer.setSize(innerWidth, innerHeight);

        //set p ratio for mobile, set max to 2
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        //composer size
        this.composer.setSize(innerWidth, innerHeight)
    }
}