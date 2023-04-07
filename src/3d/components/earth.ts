
export function setEarth(asset: THREE.Object3D) {
    asset.scale.set(6, 6, 6)
    asset.position.set(0, 0, 0)

    asset.traverse((node)=>{
        if(node.type == 'Mesh') {
            node.receiveShadow = true
        }
    })

    return asset
}