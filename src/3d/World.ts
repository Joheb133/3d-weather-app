import { AmbientLight, AnimationMixer, Clock} from 'three';

import assets from './components/assets';
import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { setEarth } from './components/earth';
import { displayWeatherIn, displayWeatherOut, setWeather, weatherAnimation } from './components/weather';

import { AssetLoader } from './systems/AssetLoader';
import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';

import { rotateSphere } from './utils/rotateSphere';
import { createLight } from './components/lighting';
import { idleAnimations } from './systems/animations';

//create threejs scene
export default class World {
    private camera: THREE.PerspectiveCamera = createCamera()
    private mixer: any
    private items: any // unedited files
    private weather: any
    private earth: any
    private currentWeather: any
    constructor() {}

    async init(){
        /* load assets */
        const assetLoader = new AssetLoader(assets);
        this.items = await assetLoader.startLoading() as {[key: string]: any};

        /* Setup scene */
        const scene = createScene();
        const renderer = createRenderer();
        const camera = this.camera;

        scene.add(this.camera);

        /* Add models */
        this.earth = setEarth(this.items.earth_model.scene)
        this.weather = setWeather(this.items.weather_models.scene)
        scene.add(this.earth, this.weather)

        /* lighting */
        scene.add(new AmbientLight(0xffffff, 0.8));
        scene.add(createLight());
        
        /* set sizes */
        const resizer = new Resizer(camera, renderer);
        resizer.setSize();

        /* Configure animation clips */
        const clock = new Clock()
        const mixer = new AnimationMixer(scene)
        this.mixer = mixer

        /* Handle continous animations */
        idleAnimations(mixer, this.items.earth_model.animations)

        /* animator */
        function animate(){
            mixer.update(clock.getDelta())
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()
    };

    rotateEarth(lat: number, lon: number){
        rotateSphere(this.earth, lat, lon)
    }

    async weatherAnimation(name: string, sameLocation?: boolean){
        if(sameLocation && this.currentWeather === name) return //return if updating weather & icon !change
        await displayWeatherOut(this.weather)
        displayWeatherIn(this.weather, name)
        weatherAnimation(name, this.items.weather_models.animations, this.mixer)
        this.currentWeather = name
    };
};