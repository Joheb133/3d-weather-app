
import rotateAroundSphere from "../utils/sphericalRotate";

export function setWeather(asset: THREE.Object3D) {
    asset.scale.set(0.25, 0.25, 0.25)
    return asset
}

export function moveWeatherAsset(group: THREE.Group, name: string, lat: number, lon: number) {
    //set all assets to invisible
    group.children.forEach(element =>{
        element.visible = false

        //set right object to visible
        if(element.name === name) {
            element.visible = true;
            console.log(element)
        }
    })

    //rotate group around sphere
    rotateAroundSphere(group, lat, lon, 0.1, false)
}