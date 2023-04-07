//handle idle/continous animations

export function idleAnimations(mixer: THREE.AnimationMixer, animations: []) {
    animations.forEach(element =>{
        mixer.clipAction(element).play()
    })
}