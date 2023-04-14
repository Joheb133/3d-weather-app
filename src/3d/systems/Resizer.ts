import { EffectComposer } from 'postprocessing'

export class Resizer {
    private canvas: HTMLCanvasElement
    private HTMLContainer: any
    constructor(
        private camera: THREE.PerspectiveCamera,
        private renderer: THREE.WebGLRenderer,
        private composer?: EffectComposer) {

        this.canvas = renderer.domElement;
        this.HTMLContainer = this.canvas.parentElement;

        //listen for container resize
        window.addEventListener('resize', () => {
            this.setSize();
        })
    }

    setSize() {

        //set wdith/height
        let width = this.HTMLContainer.clientWidth;
        let height = this.HTMLContainer.clientHeight;

        if(width > height) {
            width = height
        } else {
            height = width
        }

        //set canvas size
        this.canvas.width = width;
        this.canvas.height = height;

        //set camera aspect ratio
        this.camera.aspect = width / height
    
        //call project matrix to update camera
        this.camera.updateProjectionMatrix()

        //update renderer size
        this.renderer.setSize(width, height, false);

        //composer size
        if(this.composer) {
            this.composer.setSize(width, height)
        }

    }
}