import { AdditiveBlending, BackSide, Color, Mesh, ShaderMaterial, SphereGeometry} from "three"

import SphereGlowFragment from '../shaders/glowFragment.glsl?raw'
import SphereGlowVertex from '../shaders/glowVertex.glsl?raw'

export function setEarth(asset: THREE.Object3D) {
    asset.scale.set(6, 6, 6)
    asset.position.set(0, 0, 0)

    asset.traverse((node)=>{
        if(node.type == 'Mesh') {
            node.receiveShadow = true
        }
    })

    //atmosphere
    // const atmosphere = new Mesh(
    //     new SphereGeometry(1, 50, 50),
    //     new ShaderMaterial({
    //         uniforms: {
    //             u_Color: {value: new Color(0x03a5fc)}
    //         },
    //         vertexShader: SphereGlowVertex,
    //         fragmentShader: SphereGlowFragment,
    //         blending: AdditiveBlending,
    //         side: BackSide,
    //     })
    // )
    // atmosphere.position.set(asset.position.x, asset.position.y, asset.position.z);
    // atmosphere.scale.set(1.1, 1.1, 1.1)

    // atmosphere.name = 'atmosphere'
    // asset.add(atmosphere)

    return asset
}