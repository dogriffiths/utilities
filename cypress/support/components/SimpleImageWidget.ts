import CypressWidget from "../relish-cypress/CypressWidget";
import Component from "../relish-core/Component";
import CypressPage from "../relish-cypress/CypressPage";

export default class SimpleImageWidget extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    matcher(e: HTMLElement) {
        return e.getAttribute("src") || '';
    }
}
