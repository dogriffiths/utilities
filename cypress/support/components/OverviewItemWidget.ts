import Component from "../relish-core/Component";
import {VisualWidget} from "./VisualWidget";
import CypressWidget from "../relish-cypress/CypressWidget";
import ImgWidget from "./ImgWidget";

export default class OverviewItemWidget extends VisualWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    get name() {
        return new CypressWidget('.overviewName', this);
    }

    get image() {
        return new ImgWidget('.overviewImage', this);
    }

    get removeButton() {
        return new CypressWidget('.removeWhiteboardBtn', this);
    }
}
