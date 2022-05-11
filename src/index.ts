import {
    Scene,
    Mesh,
    CylinderBufferGeometry,
    MeshStandardMaterial,
    AxesHelper,
    GridHelper,


} from 'three';
import { setupCamera } from './setupCamera';
import { setupLights } from './setupLights';
import { setupOrbitControls } from './setupOrbitControls';
import { setupRenderer } from './setupRenderer';
function setupHelpers(scene: Scene) {
    const axesHelper = new AxesHelper(5);
    scene.add(axesHelper);
    const gridHelper = new GridHelper(5);
    scene.add(gridHelper);
}
export function setupThreeJSScene() {

    let dim: { w: number, h: number } = { w: window.innerWidth, h: window.innerHeight };

    const camera = setupCamera(dim);

    const renderer = setupRenderer(camera, dim);

    const controls = setupOrbitControls(camera, renderer.domElement);

    let scene = new Scene();

    setupLights(scene);

    setupHelpers(scene);

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

        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();

        requestAnimationFrame(animate);
    }
}

setupThreeJSScene();
