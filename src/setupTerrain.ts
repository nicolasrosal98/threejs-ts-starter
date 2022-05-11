import { BoxBufferGeometry, MeshStandardMaterial, Mesh, Scene } from "three";

//https://www.npmjs.com/package/simplex-noise
import SimplexNoise from 'simplex-noise';

export function setupTerrain(scene: Scene) {
    // initializing a new simplex instance
    // do this only once as it is relatively expensive
    const simplex = new SimplexNoise()

    const gridSize = 100;
    const noiseScaling = 0.03;
    const geometry = new BoxBufferGeometry(1, 0.1, 1);
    for (let row = 0; row < gridSize; row++) {

        for (let col = 0; col < gridSize; col++) {
            const material = new MeshStandardMaterial({
                color: 0xff00ff
            });

            const myShape: Mesh = new Mesh(geometry, material);
            const noiseVal = simplex.noise2D(col * noiseScaling, row * noiseScaling);
            myShape.position.x = col;
            myShape.position.z = row;
            myShape.position.y = 2 + 2 * noiseVal;

            scene.add(myShape);
        }
    }

}