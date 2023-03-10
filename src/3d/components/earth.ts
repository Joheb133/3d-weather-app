import { AdditiveBlending, BackSide, Mesh, ShaderMaterial, SphereGeometry } from "three"

import glowFragment from '../shaders/glowFragment.glsl?raw'
import glowVertex from '../shaders/glowVertex.glsl?raw'

export function setEarth(asset: THREE.Object3D) {
    asset.scale.set(6, 6, 6)
    asset.position.set(0, 0, 0)

    //atmosphere
    const atmosphere = new Mesh(
        new SphereGeometry(6, 64, 64),
        new ShaderMaterial({
            vertexShader: glowVertex,
            fragmentShader: glowFragment,
            blending: AdditiveBlending,
            side: BackSide
        })
    )

    atmosphere.name = 'atmosphere'
    asset.add(atmosphere)

    return asset
}