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
}
