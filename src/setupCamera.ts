import { PerspectiveCamera } from "three";
import { getAspect } from "./setupRenderer";

export function setupCamera(dim: { w: number; h: number }): PerspectiveCamera {
  const camera: PerspectiveCamera = new PerspectiveCamera(
    75,
    getAspect(dim),
    0.1,
    1000
  );
  camera.position.set(15, 50, 70);
  camera.lookAt(0, 0, 0);

  return camera;
}
