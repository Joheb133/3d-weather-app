import { AdditiveBlending, BackSide, Color, Mesh, ShaderMaterial, SphereGeometry} from "three"

import SphereGlowFragment from '../shaders/glowFragment.glsl?raw'
import SphereGlowVertex from '../shaders/glowVertex.glsl?raw'

export function setEarth(asset: THREE.Object3D) {
    asset.scale.set(6, 6, 6)
    asset.position.set(0, 0, 0)

    //atmosphere
    const atmosphere = new Mesh(
        new SphereGeometry(6, 50, 50),
        new ShaderMaterial({
            uniforms: {
                u_Color: {value: new Color(0x2879eb)}
            },
            vertexShader: SphereGlowVertex,
            fragmentShader: SphereGlowFragment,
            blending: AdditiveBlending,
            side: BackSide
        })
    )

    atmosphere.name = 'atmosphere'
    asset.add(atmosphere)

    return asset
}