import Component from "../relish-core/Component";
import CypressWidget from "../relish-cypress/CypressWidget";
import JournalItem from "./JournalItem";

export default class KanbanColumn extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    get tasks() {
        return this.collection(
            '.kanban-task',
            e => new CypressWidget(e, this)
        );
    }

    get header() {
        return new CypressWidget('.kanban-column-header', this);
    }
}
