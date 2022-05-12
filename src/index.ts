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

    //Load a model of a submarine and add it to the scene!
    const submarine = await loadModel("./assets/lionSubmariners.glb");
    if (submarine) {
        submarine.scale.set(5, 5, 5);
        submarine.position.setZ(20);
        scene.add(submarine);
    }

    //You can get more models from https://market.pmnd.rs/

    //keep a frame counter so we can use it as an input to an animation
    let frameCount = 0;

    animate();

    function animate() {
        renderer.render(scene, camera);

        if (submarine) {
            submarine.position.setZ(submarine.position.z -= 0.1)
            submarine.position.setY(Math.sin(frameCount / 20));
        }

        controls.update(); // required if controls has .enableDamping .autoRotate set true.

        document.getElementById("info")!.innerText = "z: " + Math.round(submarine!.position.z);
        requestAnimationFrame(animate);
        frameCount++;
    }
}

setupThreeJSScene();
