import * as THREE from "three";

export const getMeshByUserDataValue = (
    scene: THREE.Scene,
    name: string,
    value: any
) => {
    const meshes: THREE.Object3D[] = [];

    scene.traverse((node) => {
        if (node.userData[name] === value) {
            meshes.push(node);
        }
    });

    return meshes;
};
