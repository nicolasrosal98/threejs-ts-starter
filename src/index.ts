import { Object3D, Scene, Color } from "three";
import { dumpObjectToConsoleAsString } from "./debugModel";
import { loadModel } from "./loadModel";
import { setupCamera } from "./setupCamera";
// import { setupHelpers } from "./setupHelpers";
import { setupLights } from "./setupLights";
// import { setupOrbitControls } from "./setupOrbitControls";
import { setupRenderer } from "./setupRenderer";

export async function setupThreeJSScene(): Promise<void> {
  const dimensions = { w: window.innerWidth, h: window.innerHeight };

  const camera = setupCamera(dimensions);

  const renderer = setupRenderer(camera, dimensions);

  const scene = new Scene();
  scene.background = new Color(0xe1f2f7);

  setupLights(scene);

  // setupHelpers(scene);

  // setupOrbitControls(camera, renderer.domElement);

  //Load a model and add it to the scene!
  const personalRoom = await loadModel("./assets/roomwebsite.glb");
  if (personalRoom) {
    scene.add(personalRoom);
    personalRoom.scale.set(2, 2, 2);
    personalRoom.position.set(7, 3, -1);

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

    animate();
    function animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);

      if (personalRoom) {
        animatePersonalRoom(personalRoom);
      }
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
