import Component from "../relish-core/Component";
import CypressWidget from "../relish-cypress/CypressWidget";
import Checkbox from "../relish-cypress/Checkbox";

export default class JournalItem extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    get time() {
        return new CypressWidget('.journal-time', this);
    }

    get title() {
        return new CypressWidget('.journal-title', this);
    }

    get description() {
        return new CypressWidget('.journal-description', this);
    }
}
