import { Object3D, Scene, Color, Vector3 } from "three";
import { dumpObjectToConsoleAsString } from "./debugModel";
import { loadModel } from "./loadModel";
import { setupCamera } from "./setupCamera";
import { setupHelpers } from "./setupHelpers";
import { setupLights } from "./setupLights";
// import { setupOrbitControls } from "./setupOrbitControls";
import { setupRenderer } from "./setupRenderer";

import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

export async function setupThreeJSScene(): Promise<void> {
  const gui = new GUI();

  const dimensions = { w: window.innerWidth, h: window.innerHeight };
  const cameraInitTarget = new Vector3(-3, 1, 0);
  const cameraEndPos = new Vector3(4.34, 3.12, 3.36);

  const camera = setupCamera(dimensions, cameraInitTarget);

  const renderer = setupRenderer(camera, dimensions);

  const scene = new Scene();
  scene.background = new Color(0xe1f2f7);

  setupLights(scene);

  const helpers = setupHelpers(scene);

  // setupOrbitControls(camera, renderer.domElement);

  //Load a model and add it to the scene!
  const personalRoom = await loadModel("./assets/roomwebsite.glb");
  if (personalRoom) {
    scene.add(personalRoom);
    personalRoom.scale.set(2, 2, 2);

    //Optional: See in console what the model / scene consists of
    dumpObjectToConsoleAsString(personalRoom);

    personalRoom.traverse((child) => {
      if (child.name === "chair") {
        personalRoom.userData.chair = child;
      }
      if (child.name === "Cube") {
        personalRoom.userData.Cube = child;
      }
      if (child.name === "Cube001") {
        personalRoom.userData.Cube001 = child;
      }
    });

    let frameCount = 1;
    let bodyYPos = 0;
    function handleScroll(event: any) {
      bodyYPos = event.target.body.getBoundingClientRect().top;
    }
    document.body.onscroll = handleScroll;

    const commands = {
      logCamPos: () => console.log(camera.position),
      lerpCamPos: () => camera.position.lerp(cameraEndPos, 0.5),
    };

    gui
      .add(personalRoom.userData.chair.position, "y", -50, 50)
      .name("Chair Y Position");
    gui.add(helpers.axesHelper, "visible").name("axesHelper");
    gui.add(helpers.gridHelper, "visible").name("gridHelper");
    gui.add(camera.position, "x", -10, 10).name("Camera X Position");
    gui.add(camera.position, "y", -10, 10).name("Camera Y Position");
    gui.add(camera.position, "z", -10, 10).name("Camera Z Position");
    gui.add(camera.rotation, "y", -10, 10).name("Camera Y Rotation");
    gui.add(commands, "logCamPos");
    gui.add(commands, "lerpCamPos");

    animate();

    function animate() {
      requestAnimationFrame(animate);

      if (personalRoom) {
        animatePersonalRoom(personalRoom);
        // camera.lookAt(personalRoom.userData.chair.position);
      }

      renderer.render(scene, camera);
      frameCount++;
    }
    function animatePersonalRoom(personalRoom: Object3D) {
      personalRoom.userData.chair.rotation.y = Math.sin(frameCount / 50);
      personalRoom.userData.Cube.rotation.z = 1 + bodyYPos / 120;
      personalRoom.userData.Cube001.rotation.z = bodyYPos / 1200;
    }
  }
}

setupThreeJSScene();
