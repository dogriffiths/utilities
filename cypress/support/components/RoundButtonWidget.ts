import CypressWidget from "../relish-cypress/CypressWidget";
import Component from "../relish-core/Component";

export default class RoundButtonWidget extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    assertActive() {
        this.assertHasClass('active')
    }

    assertInactive() {
        this.assertDoesNotHaveClass('active')
    }
}
