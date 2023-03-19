import { PCFSoftShadowMap, WebGLRenderer, sRGBEncoding, LinearToneMapping } from 'three'



export function createRenderer() {
    const canvas = document.querySelector('#three-canvas-el') as HTMLCanvasElement
    const renderer = new WebGLRenderer({
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        depth: false,
        canvas
    });

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    return renderer
}