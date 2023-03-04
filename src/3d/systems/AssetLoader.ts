import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; 
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { EquirectangularReflectionMapping } from "three";

import { Obj } from "../../utils/types";

export class AssetLoader{
    private loaders: Obj = {}
    private queue: number
    private current: number = 0;
    private items: Obj = {}

    constructor(private assets: Array<Obj>){
        this.assets = assets;
        this.queue = assets.length

        this.setLoaders();
    }

    private setLoaders(){
        this.loaders.gltf = new GLTFLoader();
        this.loaders.rgbe = new RGBELoader();
    }

    startLoading(){
        return new Promise((res)=>{
            for (const asset of this.assets){
                if(asset.type === 'glb' || asset.type === 'gltf'){
                    this.loaders.gltf.load(asset.path, (file: Obj)=>{ 
                        //if asset has animation add it to object3d
                        if(file.animations.length !== 0){
                            file.scene.animations = file.animations
                        }

                        //pass resolve as loadedAsset callback
                        this.loadedAsset(asset, file.scene, res)
                    })
                } else if(asset.type === 'hdr') {
                    this.loaders.rgbe.load(asset.path, (file: THREE.DataTexture)=>{
                        file.mapping = EquirectangularReflectionMapping;
                        this.loadedAsset(asset, file, res)
                    })
                } else {
                    console.error(`Unsupported file type: error loading ${asset}`)
                    this.current++
                }
            }
        })
    }

    private loadedAsset(asset: any, file: any, resolve: Function){
        this.items[asset.name] = file;
        this.current++;
        if(this.current === this.queue){
            console.log('All assets loaded')
            resolve(this.items)
        }
    }
}