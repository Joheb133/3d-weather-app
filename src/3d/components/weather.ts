import rotateAroundSphere from "../utils/sphericalRotate";

export function setWeather(mesh: THREE.Object3D) {
    mesh.scale.set(0.5, 0.5, 0.5) //.25
    mesh.children.forEach(element => {
        element.position.set(0, 0, 0)
        element.rotation.set(-Math.PI/2, Math.PI/2, 0)
    })

    return mesh
}

export function moveWeatherAsset(group: THREE.Group, name: string, lat: number, lon: number) {

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
        }
    })

    //rotate group around sphere
    rotateAroundSphere(group, lat, lon, 0.2)
}

export function weatherAnimation(name: string, animations: [], mixer: THREE.AnimationMixer) {
    //play / stop animations
    animations.forEach((element: any) => {
        if (element.name == name) {
            mixer.clipAction(element).play()
        } else {
            mixer.clipAction(element).stop()
        }
    });
}