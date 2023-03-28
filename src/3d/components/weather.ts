import gsap from "gsap"


export function setWeather(mesh: THREE.Object3D) {
    mesh.scale.set(0.5, 0.5, 0.5)
    mesh.children.forEach(element => {
        element.position.set(0, 0, 0)
        element.rotation.set(-Math.PI / 2, Math.PI / 1.5, 0)
    })
    mesh.position.set(0, 0, 0)

    mesh.traverse((node) => {
        if (node.type == 'Mesh') {
            node.castShadow = true;
            node.receiveShadow = false;
        }
    })

    return mesh
}

export function setRightWeather(group: THREE.Group, name: string) {
    group.position.set(0, 0, 0)

    //set all assets to invisible
    group.children.forEach(element => {
        let id = name;

        element.visible = false

        //if mesh name doesnt have n or d
        if (element.name.length == 2) {
            id = id.slice(0, 2)
        }

        //set right object to visible
        if (element.name === id) {
            element.visible = true;
            gsap.to(group.position, {
                z: -6.5,
                duration: 2,
                ease: 'power2'
            })
        }
    })
}

export function weatherAnimation(name: string, animations: [], mixer: THREE.AnimationMixer) {
    //play / stop animations
    animations.forEach((element: any) => {
        let id = name;
        //if animation name doesnt have n or d
        if (element.name.length == 2) {
            id = id.slice(0, 2)
        }
        if (element.name === id) {
            mixer.clipAction(element).play()
        } else {
            mixer.clipAction(element).stop()
        }
    });
}