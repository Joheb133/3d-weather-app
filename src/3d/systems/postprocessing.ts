import {EffectComposer, RenderPass, EffectPass, SMAAEffect, SMAAPreset, PredicationMode} from 'postprocessing'

export function createComposer(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera){
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new EffectPass(camera, new SMAAEffect({
        preset: SMAAPreset.ULTRA,
        predicationMode: PredicationMode.DEPTH
    })))

    return composer as EffectComposer
}