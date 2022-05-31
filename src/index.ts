import {
    Scene,
    Mesh,
    MeshStandardMaterial,
    BoxBufferGeometry,
} from 'three';
import { setupCamera } from './setupCamera';
import { setupHelpers } from './setupHelpers';
import { setupLights } from './setupLights';
import { setupOrbitControls } from './setupOrbitControls';
import { setupRenderer } from './setupRenderer';

export function setupThreeJSScene(): void {

    const dimensions = { w: window.innerWidth, h: window.innerHeight };

    const camera = setupCamera(dimensions);

    const renderer = setupRenderer(camera, dimensions);

    const controls = setupOrbitControls(camera, renderer.domElement);

    const scene = new Scene();

    setupLights(scene);

    setupHelpers(scene);

    //shape(s)
    const geometry = new BoxBufferGeometry(10, 10, 10);
    const material = new MeshStandardMaterial({
        color: 0xff00ff
    });

    const myShape: Mesh = new Mesh(geometry, material);
    myShape.position.y = 20;
    scene.add(myShape);


    animate();


    function animate() {
        myShape.rotation.y += 0.01;
        myShape.rotation.x += 0.02;

        renderer.render(scene, camera);

        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();

        requestAnimationFrame(animate);
    }
}

setupThreeJSScene();
