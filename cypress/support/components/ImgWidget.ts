import Component from "../relish-core/Component";
import {VisualWidget} from "./VisualWidget";

export default class ImgWidget extends VisualWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    matches(expectedResult: string) {
        this.getChainer().then($img => {
            expect($img.length).to.equal(1);
            this.canvasMatches(this.createCanvas($img[0]), expectedResult);
        });
    }

    private createCanvas($img: CanvasImageSource) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions to match the image
        // @ts-ignore
        canvas.width = $img.naturalWidth;
        // @ts-ignore
        canvas.height = $img.naturalHeight;

        // Draw the image onto the canvas
        // @ts-ignore
        ctx.drawImage($img, 0, 0);
        return canvas;
    }
}
