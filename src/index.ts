import { Scene } from "three";
import { dumpObjectToConsoleAsString } from "./debugModel";
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

  const scene = new Scene();

  setupLights(scene);

  setupHelpers(scene);

  setupOrbitControls(camera, renderer.domElement);

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
    });

    animate();

    function animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
  }
}

setupThreeJSScene();
