import {
    Scene,
    Mesh,
    MeshStandardMaterial,
    BoxGeometry,
    Color
} from 'three';
import { getExpectedElement } from './domUtils';
import { between, lerp, map } from './math';

import { setupCamera } from './setupCamera';
import { setupHelpers } from './setupHelpers';
import { setupLights } from './setupLights';
import { setupRenderer } from './setupRenderer';

export function setupThreeJSScene(): void {

    const dimensions = { w: window.innerWidth, h: window.innerHeight };

    const camera = setupCamera(dimensions);

    const renderer = setupRenderer(camera, dimensions);

    const scene = new Scene();


    const geom = new BoxGeometry(20, 20, 20);
    const cubeMesh = new Mesh(geom, new MeshStandardMaterial({ wireframe: false, color: new Color("cyan") }))
    cubeMesh.position.set(50, 15, 0);

    cubeMesh.userData.desiredRotationY = 0
    cubeMesh.userData.desiredRotationX = 0
    cubeMesh.userData.desiredPositionX = 0
    cubeMesh.userData.desiredDimHeight = 1

    scene.add(cubeMesh);

    document.body.onscroll = handleScroll;

    function handleScroll() {
        //Note: It is likely better to do all this more declaratively with GSAP
        const t = document.body.getBoundingClientRect().top;
        setHudText("t: " + t);
        handleScrollEffectOnSpinnyCube(t);
        handleScrollEffectOnFloatingInfoPara();
    }

    function handleScrollEffectOnSpinnyCube(t: number): void {
        const cutHeight1 = -1200;
        const cutHeight2 = -850;

        if (t < cutHeight1) {
            cubeMesh.userData.desiredPositionX = -40;
            cubeMesh.userData.desiredRotationX = 0;
            cubeMesh.userData.desiredRotationY = t / 150;
            cubeMesh.userData.desiredDimHeight = 0.1 + 0.8 * (1 + Math.sin(t / 40));
        } else if (t < cutHeight2) {
            //you COULD cut straight over without this intermediate band - lerp will smooth a little, 
            //but it'd be a very rapid transition on one pixel of scroll
            cubeMesh.userData.desiredPositionX = map(t, cutHeight1, cutHeight2, -40, 30)
            cubeMesh.userData.desiredRotationY = map(t, cutHeight1, cutHeight2, t / 150, 0)
            cubeMesh.userData.desiredRotationX = map(t, cutHeight1, cutHeight2, 0, t / 150)
        } else {
            cubeMesh.userData.desiredRotationX = t / 150;
            cubeMesh.userData.desiredRotationY = 0;
            cubeMesh.userData.desiredPositionX = 30;
        }

        cubeMesh.material.color = new Color("cyan").lerp(new Color("magenta"), Math.abs(Math.sin(t / 700)));

    }
    function handleScrollEffectOnFloatingInfoPara(): void {
        const afiElem = getExpectedElement("about-floating-info");
        const fiElem = getExpectedElement("floating-info");

        const fiElemTop = afiElem.getBoundingClientRect().top;
        if (between(fiElemTop, 0, 500)) {
            fiElem.classList.add("hilit");
            afiElem.classList.add("hilit");

        } else {
            afiElem.classList.remove("hilit")
            fiElem.classList.remove("hilit")
        }
    }
    setupLights(scene);
    setupHelpers(scene);

    //let's go!
    animate();

    function animate() {

        renderer.render(scene, camera);

        //lerp rotation towards its desired value, a little each frame

        cubeMesh.rotation.y = lerp(cubeMesh.rotation.y, cubeMesh.userData.desiredRotationY, 0.1);
        cubeMesh.rotation.x = lerp(cubeMesh.rotation.x, cubeMesh.userData.desiredRotationX, 0.1);
        cubeMesh.position.x = lerp(cubeMesh.position.x, cubeMesh.userData.desiredPositionX, 0.1);
        cubeMesh.scale.y = lerp(cubeMesh.scale.y, cubeMesh.userData.desiredDimHeight, 0.1);

        requestAnimationFrame(animate);
    }
}


function setHudText(msg: string): void {
    const hudElem = document.getElementById("floating-info");
    if (hudElem) {
        hudElem.innerText = msg;
    }
}
setupThreeJSScene();
