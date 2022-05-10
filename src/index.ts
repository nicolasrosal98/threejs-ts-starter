import {
    Scene,
    Mesh,
    CylinderBufferGeometry,
    MeshStandardMaterial,


} from 'three';
import { setupCamera } from './setupCamera';
import { setupLights } from './setupLights';
import { setupRenderer } from './setupRenderer';

export function setupThreeJSScene() {

    let dim: { w: number, h: number } = { w: window.innerWidth, h: window.innerHeight };

    const camera = setupCamera(dim);

    const renderer = setupRenderer(camera, dim);

    let scene = new Scene();

    setupLights(scene);

    //shape(s)
    const geometry = new CylinderBufferGeometry(5, 5, 20, 8);
    const material = new MeshStandardMaterial({
        color: 0xff00ff
    });

    let myShape: Mesh = new Mesh(geometry, material);
    myShape.position.z = 5;
    scene.add(myShape);


    animate();


    function animate() {
        myShape.rotation.y += 0.01;
        myShape.rotation.x += 0.02;

        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    }
}

setupThreeJSScene();
