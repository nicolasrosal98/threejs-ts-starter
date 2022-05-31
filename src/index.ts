import {
    Scene,
    Mesh,
    MeshStandardMaterial,
    BoxGeometry,
    Color,
    CameraHelper,
    PerspectiveCamera,
    Vector3
} from 'three';
import { mapLinear } from 'three/src/math/MathUtils';
import { getExpectedElement } from './domUtils';
import { between, lerp, map } from './math';

import { setupCamera } from './setupCamera';
import { setupHelpers } from './setupHelpers';
import { setupLights } from './setupLights';
import { getAspect, setupRenderer } from './setupRenderer';

export function setupThreeJSScene(): void {

    const cameraLookAtTarget: Vector3 = new Vector3(0, 0, -200);
    const dimensions = { w: window.innerWidth, h: window.innerHeight };

    const animCutPoints = {
        initial: { max: 0, min: -600 },
        rightLeft: { max: -600, min: -1000 },
        bobble: { max: -1000, min: -1900 },
        goToSpace: { max: -1900, min: -2400 },
    };

    const scene = new Scene();

    const camera = setupCamera(dimensions);
    let cameraShakeMagnitude = 0;
    //a second camera - just for something to look at!
    const camera2 = new PerspectiveCamera(30, getAspect(dimensions), 50, 150);
    camera2.position.set(0, 60, -80);

    //add this in to see an animated camera
    // const camHelper = new CameraHelper(camera2);
    // scene.add(camHelper);

    const renderer = setupRenderer(camera, dimensions);


    const geom = new BoxGeometry(20, 20, 20);
    const cubeMesh = new Mesh(geom, new MeshStandardMaterial({ wireframe: false, color: new Color("cyan") }))

    cubeMesh.userData.desiredRotationY = 0
    cubeMesh.userData.desiredRotationX = 0

    cubeMesh.userData.desiredPosition = new Vector3(50, 15, 0);
    cubeMesh.position.copy(cubeMesh.userData.desiredPosition);

    cubeMesh.userData.desiredDimHeight = 1

    scene.add(cubeMesh);

    document.body.onscroll = handleScroll;
    window.addEventListener("click", increaseCameraShake)
    setupLights(scene);
    setupHelpers(scene);

    //let's go!
    function increaseCameraShake(): void {
        3 + 4;
        console.log(Math.random())
        cameraShakeMagnitude++;
    }

    animate();

    function animate() {

        renderer.render(scene, camera);

        //lerp rotation towards its desired value, a little each frame
        cubeMesh.rotation.y = lerp(cubeMesh.rotation.y, cubeMesh.userData.desiredRotationY, 0.1);
        cubeMesh.rotation.x = lerp(cubeMesh.rotation.x, cubeMesh.userData.desiredRotationX, 0.1);

        cubeMesh.position.lerp(cubeMesh.userData.desiredPosition, 0.1);

        cubeMesh.scale.y = lerp(cubeMesh.scale.y, cubeMesh.userData.desiredDimHeight, 0.1);
        camera2.lookAt(cubeMesh.position.x, cubeMesh.position.y, cubeMesh.position.z)

        const offset = new Vector3().randomDirection().multiplyScalar(cameraShakeMagnitude * 2);
        camera.position.addVectors(camera.userData.origPosition, offset);
        //reduce shake to zero over time.
        cameraShakeMagnitude = Math.max(0, cameraShakeMagnitude * 0.95);

        requestAnimationFrame(animate);
    }

    function handleScroll() {
        //Note: It is likely better to do all this more declaratively with GSAP
        const t = document.body.getBoundingClientRect().top;
        setHudText("t: " + t);
        handleScrollEffectOnSpinnyCube(t);
        handleScrollEffectOnFloatingInfoPara();
        handleScrollEffectOnCamera(t);
    }

    function handleScrollEffectOnSpinnyCube(t: number): void {
        if (inAnimRange(t, animCutPoints.initial)) {
            cubeMesh.userData.desiredRotationX = 0;
            cubeMesh.userData.desiredRotationY = t / 150;
            cubeMesh.userData.desiredPosition = new Vector3(30, 15, 0);
        }

        if (inAnimRange(t, animCutPoints.rightLeft)) {
            const { max, min } = animCutPoints.rightLeft;
            if (t < min) {
                cubeMesh.userData.desiredPosition.set(-50, 15, 0);
                cubeMesh.userData.desiredRotationX = 0;
                cubeMesh.userData.desiredRotationY = t / 150;
            } else if (t < max) {
                //you COULD cut straight over without this intermediate band - lerp will smooth a little, 
                //but it'd be a very rapid transition on one pixel of scroll
                cubeMesh.userData.desiredPosition.set(map(t, min, max, -40, 30), 15, 0);

                cubeMesh.userData.desiredRotationX = map(t, min, max, 0, t / 150)
                cubeMesh.userData.desiredRotationY = map(t, min, max, t / 150, 0)
            }
        }
        if (inAnimRange(t, animCutPoints.bobble)) {
            cubeMesh.userData.desiredDimHeight = 0.1 + 0.8 * (1 + Math.sin(t / 40));

        }
        if (inAnimRange(t, animCutPoints.goToSpace)) {
            const { max, min } = animCutPoints.rightLeft;
            if (t < min) {
                cubeMesh.userData.desiredPosition.set(30, 100, 0);
            } else {
                cubeMesh.userData.desiredPosition.y = map(t, min, max, 300, 20)
            }

        }
        cubeMesh.material.color = new Color("cyan").lerp(new Color("magenta"), Math.abs(Math.sin(t / 700)));

    }
    function inAnimRange(t: number, { max, min }: { max: number, min: number }): boolean {
        return (t >= min && t <= max);
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

    function handleScrollEffectOnCamera(t: number): void {
        camera.fov = map(Math.cos(t / 1000), -1, 1, 60, 110);
        camera.updateProjectionMatrix();
        const { max, min } = animCutPoints.goToSpace;

        if (t < max) {
            const target2 = new Vector3(0, 200, 0);
            const frac = mapLinear(t, min, max, 1, 0);
            cameraLookAtTarget.lerp(target2, frac);
        } else {
            const target = new Vector3(0, 0, -500);
            cameraLookAtTarget.lerp(target, 0.1);
        }
        camera.lookAt(cameraLookAtTarget.x, cameraLookAtTarget.y, cameraLookAtTarget.z)
        camera2.position.y = map(Math.sin(t / 440), -1, 1, 30, 100);
        camera2.updateProjectionMatrix();
    }
}


function setHudText(msg: string): void {
    const hudElem = document.getElementById("floating-info");
    if (hudElem) {
        hudElem.innerText = msg;
    }
}
setupThreeJSScene();
