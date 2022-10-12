import { PerspectiveCamera, Vector3 } from "three";
import { getAspect } from "./setupRenderer";

export function setupCamera(
  dim: { w: number; h: number },
  target: Vector3,
): PerspectiveCamera {
  const camera: PerspectiveCamera = new PerspectiveCamera(
    75,
    getAspect(dim),
    0.1,
    1000,
  );
  camera.position.set(-1.03, 3, 5);
  camera.lookAt(target);
  return camera;
}
