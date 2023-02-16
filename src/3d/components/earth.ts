import { Mesh, SphereGeometry, MeshStandardMaterial, TextureLoader } from "three";

//load model test
export default class Earth {
    model: undefined | THREE.Mesh;
    readonly radius = 6;

    async init() {
        this.model = await this.loadEarthModel();
    }

    private async loadEarthModel() {
        const textureLoader = new TextureLoader();
        const textures = {
            map: textureLoader.loadAsync('textures/earthday_baseColor.jpg')
        }
    
        const model = new Mesh(new SphereGeometry(this.radius, 128, 128), new MeshStandardMaterial({
            map: await textures.map,
        }))

        return model as THREE.Mesh
    }
}
