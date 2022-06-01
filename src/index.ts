import {
  Scene,
  Mesh,
  MeshStandardMaterial,
  BoxBufferGeometry,
  ConeGeometry,
  BoxGeometry,
  Color,
} from "three";
import { lerp, mapLinear } from "three/src/math/MathUtils";
import { loadModel } from "./loadModel";
import { setupCamera } from "./setupCamera";
import { setupHelpers } from "./setupHelpers";
import { setupLights } from "./setupLights";
import { setupOrbitControls } from "./setupOrbitControls";
import { setupRenderer } from "./setupRenderer";

export async function setupThreeJSScene(): Promise<void> {
  const dimensions = { w: window.innerWidth, h: window.innerHeight };
  const camera = setupCamera(dimensions);
  const renderer = setupRenderer(camera, dimensions);

  //   const controls = setupOrbitControls(camera, renderer.domElement);

  const scene = new Scene();

  setupLights(scene);

  setupHelpers(scene);

  //shape(s)
  //// Cube
  const cubeGeometry = new BoxBufferGeometry(10, 10, 10);
  const cubeMaterial = new MeshStandardMaterial({
    color: 0xff00ff,
    opacity: 0.5,
    transparent: true,
  });
  const myCube: Mesh = new Mesh(cubeGeometry, cubeMaterial);
  myCube.position.y = 20;
  scene.add(myCube);
  //Submarine
  const submarine = await loadModel("./assets/submarine.glb");
  submarine?.scale.setScalar(10);
  if (submarine) {
    scene.add(submarine);
  }
  //Ocean cube
  const oceanGeometry = new BoxGeometry(100, 40, 100);
  const oceanMaterial = new MeshStandardMaterial({
    color: 0x0248fa,
    opacity: 0.5,
    transparent: true,
  });
  const myOcean: Mesh = new Mesh(oceanGeometry, oceanMaterial);
  myOcean.position.y = -20;
  scene.add(myOcean);

  let desiredX = 0;
  let frameCount = 0;
  document.body.onscroll = handleScroll;

  animate();
  //   renderer.render(scene, camera);

  function animate() {
    // camera.lookAt(myCube.position);
    // myCube.rotation.x += t * 2;
    myCube.position.x = lerp(myCube.position.x, desiredX, 0.05);
    frameCount++;

    // required if controls.enableDamping or controls.autoRotate are set to true
    // controls.update();
    if (submarine) {
      submarine.position.y = mapLinear(
        Math.cos(frameCount / 25),
        -1,
        1,
        -3.5,
        -2
      );
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  function handleScroll(): void {
    const titleEl = document.getElementById("info");
    const t = document.body.getBoundingClientRect().top;

    if (titleEl) {
      titleEl.innerText = t.toFixed(1);
    }
    myCube.rotation.y = mapLinear(t, 0, -1000, 0, Math.PI * 2);
    myCube.scale.y = mapLinear(Math.sin(t / 100), -1, 1, 0.1, 1);

    if (t > -2000) {
      desiredX = -150;
    } else {
      desiredX = 0;
    }

    // camera.position.z = 400 + t / 10;
  }
}

setupThreeJSScene();
