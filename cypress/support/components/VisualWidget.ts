import CypressWidget from "../relish-cypress/CypressWidget";
import {Buffer} from "buffer";

export class VisualWidget extends CypressWidget {

    canvasMatches(canvas: HTMLCanvasElement, expectedResult: string) {
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
            let canvasImage = 'cypress/screenshots/canvas.png';
            return cy.writeFile(canvasImage, Buffer.from(uint8Array), 'binary').then((result) => {
                cy.compareImages(canvasImage, expectedResult, 0.1)
                    .then((areImagesSimilar: boolean) => {
                        expect(areImagesSimilar).to.be.true;
                    });
            });
        });
    }
}