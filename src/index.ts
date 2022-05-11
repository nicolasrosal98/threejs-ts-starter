import {
    Scene,
    Mesh,
    MeshStandardMaterial,
    BoxBufferGeometry,
    Vector3
} from 'three';
import { loadModel } from './loadModel';
import { setupCamera } from './setupCamera';
import { setupHelpers } from './setupHelpers';
import { setupLights } from './setupLights';
import { setupOrbitControls } from './setupOrbitControls';
import { setupRenderer } from './setupRenderer';

export async function setupThreeJSScene() {

    let dim: { w: number, h: number } = { w: window.innerWidth, h: window.innerHeight };

    const camera = setupCamera(dim);

    const renderer = setupRenderer(camera, dim);

    const controls = setupOrbitControls(camera, renderer.domElement);

    let scene = new Scene();

    setupLights(scene);

    setupHelpers(scene);

    //shape(s)
    const geometry = new BoxBufferGeometry(10, 10, 10);
    const material = new MeshStandardMaterial({
        color: 0xff00ff
    });

    let myShape: Mesh = new Mesh(geometry, material);
    myShape.position.y = 20;
    scene.add(myShape);


    const submarine = await loadModel("./assets/lionSubmariners.glb");
    if (submarine) {
        submarine.scale.set(5, 5, 5);
        submarine.position.setZ(20);
        scene.add(submarine);
    }

    let frameCount = 0;

    animate();

    function animate() {
        myShape.rotation.y += 0.01;
        myShape.rotation.x += 0.02;

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
