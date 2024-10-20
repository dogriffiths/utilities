import Component from "../relish-core/Component";
import {VisualWidget} from "./VisualWidget";

export default class CanvasWidget extends VisualWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    matches(expectedResult: string) {
        this.getChainer().then(($canvas) => {
            expect($canvas.length).to.equal(1);
            this.canvasMatches($canvas[0], expectedResult);
        });
    }

    draw(x1: Number, y1: Number, x2: Number, y2: Number) {
        this.getChainer().trigger('mousedown', {button: 0, offsetX: x1, offsetY: y1})
            .trigger('mousemove', {offsetX: x2, offsetY: y2})
            .trigger('mouseup')
    }
}
