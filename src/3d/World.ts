import { AmbientLight, AnimationMixer, Clock} from 'three';

import assets from './components/assets';
import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { setEarth } from './components/earth';
import { setRightWeather, setWeather, weatherAnimation } from './components/weather';

import { AssetLoader } from './systems/AssetLoader';
import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';
import { createComposer } from './systems/postprocessing';

import { rotateSphere } from './utils/rotateSphere';

//create threejs scene
export default class World {
    private camera: THREE.PerspectiveCamera = createCamera()
    private mixer: any
    private items: any // unedited files
    private weather: any
    private earth: any
    constructor() {}

    async init(){
        /* load assets */
        const assetLoader = new AssetLoader(assets);
        this.items = await assetLoader.startLoading() as {[key: string]: any};

        /* Setup scene */
        const scene = createScene(this.items.sunset_env);
        const renderer = createRenderer();
        const camera = this.camera;
        const composer = createComposer(renderer, scene, camera)

        scene.add(this.camera);

        /* Add models */
        this.earth = setEarth(this.items.earth_model.scene)
        this.weather = setWeather(this.items.weather_models.scene)
        scene.add(this.earth, this.weather)
        

        /* lighting */
        scene.add(new AmbientLight(0xffffff, 0.5));
        
        /* set sizes */
        const resizer = new Resizer(camera, renderer, composer);
        resizer.setSize();

        /* Configure animation clips */
        const clock = new Clock()
        const mixer = new AnimationMixer(scene)
        this.mixer = mixer

        /* animator */
        function animate(){
            mixer.update(clock.getDelta())
            requestAnimationFrame(animate)
            composer.render()
        }
        animate()
    };

    rotateEarth(lat: number, lon: number){
        rotateSphere(this.earth, lat, lon)
    }

    weatherAnimation(name: string){
        setRightWeather(this.weather, name)
        weatherAnimation(name, this.items.weather_models.animations, this.mixer)
    };
};