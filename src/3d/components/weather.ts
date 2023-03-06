import rotateAroundSphere from "../utils/sphericalRotate";

export function setWeather(mesh: THREE.Object3D) {
    mesh.scale.set(1, 1, 1) //.25
    mesh.children.forEach(element => {
        element.position.set(0, 0, 0)
    })

    return mesh
}

export function moveWeatherAsset(group: THREE.Group, name: string, lat: number, lon: number) {
    //set all assets to invisible
    group.children.forEach(element => {
        element.visible = false

        //set right object to visible
        if (element.name === name) {
            element.visible = true;
        }
    })

    //rotate group around sphere
    rotateAroundSphere(group, lat, lon, 0.1, false)
}

export function weatherAnimation(name: String, animations: [], mixer: THREE.AnimationMixer){
    //play / stop animations
    animations.forEach((element: any) => {
        if(element.name == name){
            mixer.clipAction(element).play()
        } else {
            mixer.clipAction(element).stop()
        }
    });
}