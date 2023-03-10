import { AdditiveBlending, BackSide, CircleGeometry, Color, Mesh, ShaderMaterial, SphereGeometry} from "three"

import CircleGlowFragment from '../shaders/CircleGlowFragment.glsl?raw'
import CircleGlowVertex from '../shaders/CircleGlowVertex.glsl?raw'
import SphereGlowFragment from '../shaders/glowFragment.glsl?raw'
import SphereGlowVertex from '../shaders/glowVertex.glsl?raw'

export function setEarth(asset: THREE.Object3D) {
    asset.scale.set(6, 6, 6)
    asset.position.set(0, 0, 0)

    //atmosphere
    // const atmosphere = new Mesh(
    //     new CircleGeometry(10, 64),
    //     new ShaderMaterial({
    //         uniforms: {
    //           u_circleColor: { value: new Color(0x128CE5) },
    //           u_backgroundColor: { value: new Color(0x0) },
    //           u_circleRadius: { value: 0.5 },
    //         },
    //         vertexShader: CircleGlowVertex,
    //         fragmentShader: CircleGlowFragment,
    //         blending: AdditiveBlending,
    //       })
    // )
    
    // atmosphere.position.set(0, 0, 10)
    // atmosphere.lookAt(0, 0, 8)

    const atmosphere = new Mesh(
        new SphereGeometry(6, 50, 50),
        new ShaderMaterial({
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