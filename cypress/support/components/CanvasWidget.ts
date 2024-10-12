import CypressWidget from "../relish-cypress/CypressWidget";
import Component from "../relish-core/Component";
import {Buffer} from "buffer";

export default class CanvasWidget extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    mouseDown(x: number, y: number) {
        this.getChainer().trigger('mousedown', {clientX: 150, clientY: 150})
        return this;
    }

    mouseMove(x: number, y: number) {
        this.getChainer().trigger('mousemove', {clientX: 150, clientY: 150})
        return this;
    }

    mouseUp() {
        this.getChainer().trigger('mouseup')
        return this;
    }

    matches(expectedResult: string) {
        this.getChainer().then(($canvas) => {
            expect($canvas.length).to.equal(1);
            const canvas = $canvas[0];

            // @ts-ignore
            cy.log(`Canvas dimensions: ${canvas.width}x${canvas.height}`);

            // @ts-ignore
            const canvasToBlob = new Promise<Blob>((resolve, reject) => {
                // @ts-ignore
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to create blob from canvas'));
                    }
                }, 'image/png');
            });

            // @ts-ignore
            cy.wrap(canvasToBlob).then((blob: Blob) => {
                return blob.arrayBuffer();
                // @ts-ignore
            }).then((arrayBuffer: ArrayBuffer) => {
                const uint8Array = new Uint8Array(arrayBuffer);
                // @ts-ignore
                let canvasImage = 'cypress/downloads/canvas.png';
                return cy.writeFile(canvasImage, Buffer.from(uint8Array), 'binary').then((result) => {
                    cy.compareImages(canvasImage, expectedResult, 0.1)
                        .then((areImagesSimilar: boolean) => {
                            expect(areImagesSimilar).to.be.true;
                        });
                });
            });
        });
    }
}
