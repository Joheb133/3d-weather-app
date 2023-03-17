import { EffectComposer } from 'postprocessing'

export class Resizer {
    private canvas: HTMLCanvasElement
    private HTMLContainer: any
    constructor(
        private camera: THREE.PerspectiveCamera,
        private renderer: THREE.WebGLRenderer,
        private composer: EffectComposer) {

        this.canvas = renderer.domElement;
        this.HTMLContainer = this.canvas.parentElement;

        //listen for container resize
        window.addEventListener('resize', () => {
            this.setSize();
        })
    }

    setSize() {

        this.canvas.width = this.HTMLContainer.clientWidth;
        this.canvas.height = this.HTMLContainer.clientHeight;

        //set wdith/height
        let width = this.canvas.clientWidth;
        let height = this.canvas.clientHeight

        //set camera aspect ratio
        this.camera.aspect = width / height

        //call project matrix to update camera
        this.camera.updateProjectionMatrix()

        //update renderer size
        this.renderer.setSize(width, height, false);

        //set p ratio for mobile, set max to 2
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        //composer size
        this.composer.setSize(width, height)
    }
}