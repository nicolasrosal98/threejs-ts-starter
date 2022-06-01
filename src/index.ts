import {
  Scene,
  Mesh,
  MeshStandardMaterial,
  BoxBufferGeometry,
  ConeGeometry,
} from "three";
import { setupCamera } from "./setupCamera";
import { setupHelpers } from "./setupHelpers";
import { setupLights } from "./setupLights";
import { setupOrbitControls } from "./setupOrbitControls";
import { setupRenderer } from "./setupRenderer";

export function setupThreeJSScene(): void {
  const dimensions = { w: window.innerWidth, h: window.innerHeight };
  const camera = setupCamera(dimensions);
  const renderer = setupRenderer(camera, dimensions);

  const controls = setupOrbitControls(camera, renderer.domElement);

  const scene = new Scene();

  setupLights(scene);

  setupHelpers(scene);

  //shape(s)
  //// Cube
  const cubeGeometry = new BoxBufferGeometry(10, 10, 10);
  const cubeMaterial = new MeshStandardMaterial({
    color: 0xff00ff,
  });
  const myCube: Mesh = new Mesh(cubeGeometry, cubeMaterial);
  myCube.position.y = 20;
  scene.add(myCube);
  ////Christmas tree
  const coneGeometry = new ConeGeometry(2, 5, 10);
  const coneMaterial = new MeshStandardMaterial({
    color: 0x00ff00,
  });
  const myLowerTree: Mesh = new Mesh(coneGeometry, coneMaterial);
  const myUpperTree: Mesh = new Mesh(coneGeometry, coneMaterial);
  myLowerTree.position.set(50, 5, -50);
  myUpperTree.position.set(50, 8, -50);
  scene.add(myLowerTree);
  scene.add(myUpperTree);

  animate();

  function animate() {
    myCube.rotation.y += 0.01;
    myCube.rotation.x += 0.02;

    renderer.render(scene, camera);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    requestAnimationFrame(animate);
  }
}

setupThreeJSScene();
