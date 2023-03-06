import { AmbientLight, AnimationMixer, Clock, Event, Object3D } from 'three';

import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { AssetLoader } from './systems/AssetLoader';
import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';

import assets from './components/assets';
import rotateAroundSphere from './utils/sphericalRotate';
import { setEarth } from './components/earth';
import { moveWeatherAsset, setWeather, weatherAnimation } from './components/weather';

//create threejs scene
export default class World {
    private camera: THREE.PerspectiveCamera = createCamera()
    private mixer: any
    private items: any // unedited files
    private weather: any
    constructor(private container: HTMLDivElement) {}

    async init(){
        /* load assets */
        const assetLoader = new AssetLoader(assets);
        this.items = await assetLoader.startLoading() as {[key: string]: any};
        console.log(this.items.weather_models)

        /* Setup scene */
        const scene = createScene(this.items.sunset_env);
        const renderer = createRenderer();
        const camera = this.camera;
        this.container.append(renderer.domElement);

        scene.add(this.camera);

        /* Add models */
        const earth = setEarth(this.items.earth_model.scene)
        this.weather = setWeather(this.items.weather_models.scene)
        scene.add(earth, this.weather)
        

        /* lighting */
        scene.add(new AmbientLight(0xffffff, 0.5));
        
        /* set sizes */
        const resizer = new Resizer(this.container, camera, renderer);
        resizer.setSize();

        /* Configure animation clips */
        const clock = new Clock()
        const mixer = new AnimationMixer(scene)
        this.mixer = mixer

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
        weatherAnimation(name, this.items.weather_models.animations, this.mixer, this.weather)
    };
};