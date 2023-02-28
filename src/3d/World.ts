import { AmbientLight } from 'three';

import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { AssetLoader } from './systems/AssetLoader';
import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';

import assets from './components/assets';
import rotateAroundSphere from './utils/sphericalRotate';
import { setEarth } from './components/earth';

//create threejs scene
export default class World {
    private camera: THREE.PerspectiveCamera = createCamera()
    constructor(private container: HTMLDivElement) {}

    async init(){
        /* load assets */
        const assetLoader = new AssetLoader(assets);
        const items = await assetLoader.startLoading() as {[key: string]: any};
        console.log(items);

        /* Setup scene */
        const scene = createScene(items.sunset_env);
        const renderer = createRenderer();
        const camera = this.camera;
        this.container.append(renderer.domElement);

        scene.add(this.camera);

        /* Add models */
        const earth = setEarth(items.earth_model)
        scene.add(earth)

        /* lighting */
        scene.add(new AmbientLight(0xffffff, 0.5));
        
        /* set sizes */
        const resizer = new Resizer(this.container, camera, renderer);
        resizer.setSize();

        /* animator */
        function animate(){
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()
    };

    camAroundSphere(lat: number, lon: number, radius: number){
        rotateAroundSphere(this.camera, lat, lon, radius);
    };
};