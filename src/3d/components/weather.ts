import gsap from "gsap"


export function setWeather(group: THREE.Object3D) {
    group.scale.set(0, 0, 0)
    group.children.forEach(element => {
        element.position.set(0, 0, 0)
        element.rotation.set(-Math.PI / 2, Math.PI / 1.5, 0)
    })
    group.position.set(0, 0, -6.4)

    group.traverse((node) => {
        if (node.type == 'Mesh') {
            node.castShadow = true;
            node.receiveShadow = false;
        }
    })

    return group
}

export function displayWeatherIn(group: THREE.Group, name: string) {

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
            gsap.to(group.scale, {
                x: 0.75, y: 0.75, z: 0.75,
                duration: 2,
                delay: 0.5, //matches duration of out animation
                ease: 'power2',
            })
        }
    })
}

//outro animation for weather
export async function displayWeatherOut(group: THREE.Group) {
    //hide weather animation
    if (group.scale.x !== 0 && group.scale.y !== 0 && group.scale.z !== 0) {
        await gsap.to(group.scale, {
            x: 0, y: 0, z: 0,
            duration: 0.5,
            ease: 'power2'
        })
    }
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