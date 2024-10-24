import Component from "../relish-core/Component";
import {VisualWidget} from "./VisualWidget";
import CypressWidget from "../relish-cypress/CypressWidget";
import ImgWidget from "./ImgWidget";

export default class Column extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    get title() {
        return new CypressWidget('.column-title', this);
    }
}
