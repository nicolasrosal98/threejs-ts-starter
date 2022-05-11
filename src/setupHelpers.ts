import { Scene, AxesHelper, GridHelper } from "three";

export function setupHelpers(scene: Scene) {
    const axesHelper = new AxesHelper(10);
    scene.add(axesHelper);
    const gridHelper = new GridHelper(100);
    scene.add(gridHelper);
}