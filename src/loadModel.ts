import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export async function loadModel(url: string) {
    const loader = new GLTFLoader();
    try {
        console.log('loading', url)
        // const realURL = new URL(url, import.meta.url);
        const loadedGLTF = await loader.loadAsync(url);
        const model = loadedGLTF.scene;
        return model;
    } catch (err) {
        console.error(`ERROR loading ${url}`, err)
        return null;
    }
}