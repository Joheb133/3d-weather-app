
export function setEarth(asset: THREE.Object3D) {
    asset.scale.set(6, 6, 6)
    //asset.rotation.set(0, Math.PI/2, 0)
    asset.position.set(0, 0, 0)

    return asset
}