import { Scene, AxesHelper, GridHelper } from "three";

export function setupHelpers(scene: Scene) {
  const axesHelper = new AxesHelper(2);
  axesHelper.position.set(3, 3, 0); //lift up from grid
  scene.add(axesHelper);
  const gridHelper = new GridHelper(10);
  scene.add(gridHelper);
  return { axesHelper, gridHelper };
}
