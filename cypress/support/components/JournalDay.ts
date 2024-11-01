import Component from "../relish-core/Component";
import CypressWidget from "../relish-cypress/CypressWidget";
import Checkbox from "../relish-cypress/Checkbox";
import CollectionWidget from "../relish-cypress/CollectionWidget";
import JournalItem from "./JournalItem";

export default class JournalDay extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    get journalItems() {
        const widget: CollectionWidget<JournalItem> = new CollectionWidget<JournalItem>(
            ':self',
            '.journal-item',
            e => new JournalItem(e, widget),
            this
        );
        return widget;
    }

    get header() {
        return new CypressWidget('.journal-day-header', this);
    }
}
