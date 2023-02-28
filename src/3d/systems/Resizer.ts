
export class Resizer {
    private width: number
    private height: number
    constructor(
        private container: HTMLDivElement,
        private camera: THREE.PerspectiveCamera,
        private renderer: THREE.WebGLRenderer) {

        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        //listen for container resize
        window.addEventListener('resize', () => {
            this.width = this.container.clientWidth;
            this.height = this.container.clientHeight;
            this.setSize();
        })
    }

    setSize() {
        //set camera aspect ratio
        this.camera.aspect = this.width / this.height

        //call project matrix to update camera
        this.camera.updateProjectionMatrix()

        //update renderer size
        this.renderer.setSize(this.width, this.height);

        //set p ratio for mobile, set max to 2
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
}