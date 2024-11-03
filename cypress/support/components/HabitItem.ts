import Component from "../relish-core/Component";
import CypressWidget from "../relish-cypress/CypressWidget";
import Checkbox from "../relish-cypress/Checkbox";

export default class HabitItem extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    get name() {
        return new CypressWidget('.habit-name', this);
    }

    get lastUpdate() {
        return new CypressWidget('.habit-last-update', this);
    }

    get bestStreak() {
        return new CypressWidget('.best-streak span:nth-child(2)', this);
    }

    get currentStreak() {
        return new CypressWidget('.current-streak span:nth-child(2)', this);
    }
}
