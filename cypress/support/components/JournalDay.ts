import Component from "../relish-core/Component";
import CypressWidget from "../relish-cypress/CypressWidget";
import JournalItem from "./JournalItem";

export default class JournalDay extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    get journalItems() {
        return this.collection(
            '.journal-item',
            e => new JournalItem(e, this)
        );
    }

    get header() {
        return new CypressWidget('.journal-day-header', this);
    }
}
