import Component from "../relish-core/Component";
import CypressWidget from "../relish-cypress/CypressWidget";
import Checkbox from "../relish-cypress/Checkbox";

class StreakWidget extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    matches(s: string) {
        super.matches(s + "\n🔥");
    }
}

export default class TaskItem extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    get checkbox() {
        return new Checkbox('.task-checkbox', this);
    }

    get text() {
        return new CypressWidget('.task-text span', this);
    }

    get streak() {
        return new StreakWidget('.task-streak', this);
    }

    get description() {
        return new CypressWidget('.task-description', this);
    }

    get comments() {
        return new CypressWidget('.task-comments', this);
    }

    get dueDate() {
        return new CypressWidget('.task-dueDate', this);
    }
}
