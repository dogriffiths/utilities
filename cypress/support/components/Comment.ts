import Component from "../relish-core/Component";
import CypressWidget from "../relish-cypress/CypressWidget";

export default class Comment extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    get text() {
        return new CypressWidget('.comment-text', this);
    }

    get date() {
        return new CypressWidget('.comment-date', this);
    }
}
