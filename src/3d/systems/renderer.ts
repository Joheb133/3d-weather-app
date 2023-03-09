import { WebGLRenderer } from 'three'



export function createRenderer() {
    const canvas = document.querySelector('#three-canvas-el') as HTMLCanvasElement
    canvas.style.display = 'block'
    const renderer = new WebGLRenderer({
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        depth: false,
        canvas: canvas
    })
    // renderer.outputEncoding = THREE.sRGBEncoding;
    // renderer.toneMapping = THREE.LinearToneMapping;
    // renderer.toneMappingExposure = 2
    return renderer
}