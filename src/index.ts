import {
    Scene,
    Mesh,
    MeshStandardMaterial,
    BoxGeometry,
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

    // const controls = setupOrbitControls(camera, renderer.domElement);

    const scene = new Scene();

    const geom = new BoxGeometry(20, 20, 20);
    const mesh = new Mesh(geom, new MeshStandardMaterial({ wireframe: false, color: 0x6666FF }))
    mesh.position.x = 50

    mesh.userData.desiredRotationY = 0
    scene.add(mesh);

    document.body.onscroll = handleScroll;
    function handleScroll() {
        const t = document.body.getBoundingClientRect().top;
        mesh.userData.desiredRotationY = t / 100;
    }

    setupLights(scene);
    setupHelpers(scene);

    //let's go!
    animate();

    function animate() {

        renderer.render(scene, camera);
        const curr = mesh.rotation.y;

        //lerp rotation towards its desired value, a little each frame
        mesh.rotation.y = curr + 0.1 * (mesh.userData.desiredRotationY - curr);

        // required if controls.enableDamping or controls.autoRotate are set to true
        // controls.update();

        requestAnimationFrame(animate);
    }
}

setupThreeJSScene();
