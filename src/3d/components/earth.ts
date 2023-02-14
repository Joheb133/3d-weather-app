import * as THREE from "three";

//load model test
export default class Earth {
    model: undefined | THREE.Mesh;
    readonly radius = 6;

    async init() {
        this.model = await this.loadEarthModel();
    }

    private async loadEarthModel() {
        const textureLoader = new THREE.TextureLoader();
        const textures = {
            map: textureLoader.loadAsync('src/3d/textures/earthday_baseColor.jpg')
        }
    
        const model = new THREE.Mesh(new THREE.SphereGeometry(this.radius, 128, 128), new THREE.MeshStandardMaterial({
            map: await textures.map,
        }))

        return model as THREE.Mesh
    }
}
