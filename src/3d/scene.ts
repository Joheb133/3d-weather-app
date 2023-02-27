import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import * as PP from 'postprocessing'


//create threejs scene
export default class scene {
    private scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

    constructor() {
        const scene = this.scene;
        const camera = this.camera;
        /* SETUP: renderer, scene & camera */
        const canvas = document.querySelector("canvas") as HTMLCanvasElement;
        const renderer = new THREE.WebGLRenderer({
            powerPreference: "high-performance",
            antialias: false,
            stencil: false,
            depth: false,
            canvas: canvas
        });
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(innerWidth, innerHeight);
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.LinearToneMapping;
        renderer.toneMappingExposure = 1.5

        camera.position.set(12, 0, 0);
        camera.lookAt(0, 0, 0)
        scene.add(camera);

        /* postprocessing */
        const composer = new PP.EffectComposer(renderer);
        composer.addPass(new PP.RenderPass(scene, camera));
        const fxaa = new PP.FXAAEffect()
        
        const bce = new PP.BrightnessContrastEffect({
            contrast: 0.1
        })
        composer.addPass(new PP.EffectPass(camera, fxaa, bce))

        /* lighting */
        scene.add(new THREE.AmbientLight(0xffffff, 0.15))

        /* enviroment map */
        const rgbeLoader = new RGBELoader()
        rgbeLoader.load('textures/sunset_in_the_chalk_quarry_1k.hdr', function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = new THREE.Color(0x3a76f0)
            scene.environment = texture;
        })

        /* resize */
        window.addEventListener("resize", () => {
            renderer.setSize(innerWidth, innerHeight)
            composer.setSize(innerWidth, innerHeight)
            camera.aspect = innerWidth / innerHeight;
            camera.updateProjectionMatrix();
        })

        /* animator */
        function animator() {
            requestAnimationFrame(animator);
            composer.render()
            //renderer.render(scene, camera)
        }
        animator();
    }

    add(object: THREE.Object3D | THREE.Mesh | THREE.Group) {
        this.scene.add(object)
    }
}