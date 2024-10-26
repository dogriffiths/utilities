import Component from "../relish-core/Component";
import CypressWidget from "../relish-cypress/CypressWidget";

export default class TaskItem extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    get checkbox() {
        return new CypressWidget('.task-checkbox', this);
    }

    get text() {
        return new CypressWidget('span', this);
    }

    get description() {
        return new CypressWidget('.task-description', this);
    }
}
