import {
    Scene,
    Mesh,
    MeshStandardMaterial,
    BoxBufferGeometry,
} from 'three';
import { setupCamera } from './setupCamera';
import { setupLights } from './setupLights';
import { setupOrbitControls } from './setupOrbitControls';
import { setupRenderer } from './setupRenderer';

export function setupThreeJSScene() {

    let dim: { w: number, h: number } = { w: window.innerWidth, h: window.innerHeight };

    const camera = setupCamera(dim);

    const renderer = setupRenderer(camera, dim);

    const controls = setupOrbitControls(camera, renderer.domElement);

    let scene = new Scene();

    setupLights(scene);

    //shape(s)
    for (let i = 0; i < 100; i++) {
        const geometry = new BoxBufferGeometry(2, 10, 2);
        const material = new MeshStandardMaterial({
            color: Math.random() * Math.pow(2, 24)
        });

        let myShape: Mesh = new Mesh(geometry, material);
        myShape.position.random()
        myShape.position.multiplyScalar(100);


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
