import {
    BoxGeometry,
    MeshBasicMaterial,
    MeshStandardMaterial,
    Mesh,
    TextureLoader,
} from 'three'

const loader = new TextureLoader()

export const addBoilerPlateMeshes = () => {
    const box = new BoxGeometry(1, 1, 1)
    const boxMaterial = new MeshBasicMaterial({ color: 0xff0000 })
    const boxMesh = new Mesh(box, boxMaterial)
    boxMesh.userData.name = 'target1'
    boxMesh.position.set(-2, 0, 0)
    return boxMesh
}

export const addStandardMesh = () => {
    const box = new BoxGeometry(1, 1, 1)
    const boxMaterial = new MeshStandardMaterial({ color: 0x800080 })
    const boxMesh = new Mesh(box, boxMaterial)
    boxMesh.userData.name = 'target2'
    boxMesh.position.set(2, 0, 0)
    return boxMesh
}