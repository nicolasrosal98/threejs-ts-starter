import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Mesh,
    CylinderBufferGeometry,
    MeshStandardMaterial,
    DirectionalLight,
    AmbientLight,

} from 'three';

export function setupThreeJSScene() {

    function getAspect() {
        return wWidth / wHeight;
    }

    let wWidth: number = window.innerWidth;
    let wHeight: number = window.innerHeight;

    let scene = new Scene();

    //camera
    let camera: PerspectiveCamera = new PerspectiveCamera(75, getAspect(), 0.1, 1000);
    camera.position.z = 50;

    //renderer

    let renderer: WebGLRenderer = new WebGLRenderer();
    renderer.setSize(wWidth, wHeight);
    document.body.appendChild(renderer.domElement);

    // add Events Global
    //TODO: fixup
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        wWidth = window.innerWidth;
        wHeight = window.innerHeight;

        camera.aspect = getAspect();
        camera.updateProjectionMatrix();

        renderer.setSize(wWidth, wHeight);
    }


    //lights
    const dirLight1 = new DirectionalLight();
    scene.add(dirLight1);
    const dirLight2 = new DirectionalLight();
    dirLight2.position.set(-5, 2, -2);
    scene.add(dirLight2);
    const light = new AmbientLight(0x404040); // soft white light
    scene.add(light);

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
