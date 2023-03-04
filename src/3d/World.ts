import { AmbientLight, Clock } from 'three';

import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { AssetLoader } from './systems/AssetLoader';
import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';

import assets from './components/assets';
import rotateAroundSphere from './utils/sphericalRotate';
import { setEarth } from './components/earth';
import { moveWeatherAsset, setWeather, weatherAnimationMixer } from './components/weather';

//create threejs scene
export default class World {
    private camera: THREE.PerspectiveCamera = createCamera()
    private weather: any
    constructor(private container: HTMLDivElement) {}

    async init(){
        /* load assets */
        const assetLoader = new AssetLoader(assets);
        const items = await assetLoader.startLoading() as {[key: string]: any};

        /* Setup scene */
        const scene = createScene(items.sunset_env);
        const renderer = createRenderer();
        const camera = this.camera;
        this.container.append(renderer.domElement);

        scene.add(this.camera);

        /* Add models */
        const earth = setEarth(items.earth_model)
        this.weather = setWeather(items.weather_models)
        const rain = setWeather(items.rain_model)
        console.log(rain)
        scene.add(rain)

        /* lighting */
        scene.add(new AmbientLight(0xffffff, 0.5));
        
        /* set sizes */
        const resizer = new Resizer(this.container, camera, renderer);
        resizer.setSize();

        /* Configure animation clips */
        const mixer = weatherAnimationMixer(rain)
        const clock = new Clock()

        /* animator */
        function animate(){
            mixer.update(clock.getDelta())
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()
    };

    camAroundSphere(lat: number, lon: number){
        rotateAroundSphere(this.camera, lat, lon, 3);
    };

    weatherAroundSphere(name: string, lat: number, lon: number){
        moveWeatherAsset(this.weather, name, lat, lon)
    }
};