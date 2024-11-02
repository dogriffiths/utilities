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

class CommentsCountWidget extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    matches(s: string) {
        super.matches("💬 " + s);
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
        return new CypressWidget('.task-header span', this);
    }

    get streak() {
        return new StreakWidget('.streak-count', this);
    }

    get description() {
        return new CypressWidget('.task-description', this);
    }

    get comments() {
        return new CommentsCountWidget('.task-comments-count', this);
    }

    get dueDate() {
        return new CypressWidget('.task-dueDate', this);
    }
}
