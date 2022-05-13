import { Scene } from 'three';
import { loadModel } from './loadModel';
import { setupCamera } from './setupCamera';
import { setupHelpers } from './setupHelpers';
import { setupLights } from './setupLights';
import { setupOrbitControls } from './setupOrbitControls';
import { setupRenderer } from './setupRenderer';

export async function setupThreeJSScene() {

    let dimensions = { w: window.innerWidth, h: window.innerHeight };

    const camera = setupCamera(dimensions);

    const renderer = setupRenderer(camera, dimensions);

    const controls = setupOrbitControls(camera, renderer.domElement);

    let scene = new Scene();

    setupLights(scene);

    setupHelpers(scene);


    const treesAndHouse = await loadModel("./assets/treesAndHouse.glb");
    if (treesAndHouse) {
        treesAndHouse.scale.set(5, 5, 5);
        treesAndHouse.position.setX(50);
        scene.add(treesAndHouse);
    }

    //You can get more models from https://market.pmnd.rs/

    //keep a frame counter so we can use it as an input to an animation
    let frameCount = 0;

    animate();

    function animate() {
        renderer.render(scene, camera);

        controls.update(); // required if controls has .enableDamping .autoRotate set true.

        // document.getElementById("info")!.innerText = "z: " + Math.round(submarine!.position.z);
        requestAnimationFrame(animate);
        frameCount++;
    }
}

setupThreeJSScene();
