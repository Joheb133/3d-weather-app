import { WebGLRenderer } from 'three'

export function createRenderer() {
    const renderer = new WebGLRenderer({
        powerPreference: "high-performance",
        antialias: true,
    })
    // renderer.outputEncoding = THREE.sRGBEncoding;
    // renderer.toneMapping = THREE.LinearToneMapping;
    // renderer.toneMappingExposure = 2
    return renderer
}