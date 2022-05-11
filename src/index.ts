import {
    Scene,
    Mesh,
    MeshStandardMaterial,
    BoxBufferGeometry,
    Color,
} from 'three';
import { setupCamera } from './setupCamera';
import { setupHelpers } from './setupHelpers';
import { setupLights } from './setupLights';
import { setupOrbitControls } from './setupOrbitControls';
import { setupRenderer } from './setupRenderer';
import { pick } from './randomUtils';

export function setupThreeJSScene() {

    //From https://nice-colours-quicker.netlify.app/
    const palette = [
        "#00a0b0",
        "#6a4a3c",
        "#cc333f",
        "#eb6841",
        "#edc951"
    ];

    let dim: { w: number, h: number } = { w: window.innerWidth, h: window.innerHeight };

    const camera = setupCamera(dim);

    const renderer = setupRenderer(camera, dim);

    const controls = setupOrbitControls(camera, renderer.domElement);

    let scene = new Scene();

    setupLights(scene);

    setupHelpers(scene);

    //shape(s)
    for (let i = 0; i < 100; i++) {
        const w = 5 + Math.random() * 5;
        const h = 5 + Math.random() * 5;
        const d = 5 + Math.random() * 5;


        const geometry = new BoxBufferGeometry(w, h, d);
        const material = new MeshStandardMaterial({
            color: new Color(pick(palette))
        });

        let myShape: Mesh = new Mesh(geometry, material);
        const x = -20 + Math.random() * 40;
        const y = -20 + Math.random() * 40;
        const z = -20 + Math.random() * 40;
        myShape.position.set(x, y, z);

        scene.add(myShape);
    }

    animate();


    function animate() {

        renderer.render(scene, camera);

        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();

        requestAnimationFrame(animate);
    }
}

setupThreeJSScene();
