import { Scene, BoxBufferGeometry, MeshStandardMaterial, Color, Mesh } from "three";
import { pick } from "./randomUtils";

export function setupShapeCluster(scene: Scene) {
    //From https://nice-colours-quicker.netlify.app/
    const palette = [
        "#00a0b0",
        "#6a4a3c",
        "#cc333f",
        "#eb6841",
        "#edc951"
    ];

    for (let i = 0; i < 40; i++) {
        const w = 8 + Math.random() * 8;
        const h = 8 + Math.random() * 8;
        const d = 8 + Math.random() * 8;

        const geometry = new BoxBufferGeometry(w, h, d);
        const material = new MeshStandardMaterial({
            color: new Color(pick(palette))
        });

        let myShape: Mesh = new Mesh(geometry, material);
        const x = -20 + Math.random() * 40;
        const y = -20 + Math.random() * 40;
        const z = -20 + Math.random() * 40;
        myShape.position.set(x, y, z);

        scene.add(myShape);
    }
}
