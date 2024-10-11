import CypressAbstractListWidget from "../relish-cypress/CypressAbstractListWidget";
import CypressWidget from "../relish-cypress/CypressWidget";
import Component from "../relish-core/Component";

export class MenuWidget extends CypressAbstractListWidget<CypressWidget> {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(
            selector,
            '*[role=menu] *[role=menuitem]',
            (e) => new CypressWidget(e, this),
            parent
        );
    }

    clickItem(menuText: string) {
        this.getChainer().click({force: true});
        cy.log(menuText)
        this.withText(menuText).assertEnabled();
        this.withText(menuText).click();
    }

    withText(name: string) {
        const xpath = `//*[@role = 'menuitem']//*[text()='${name}']`;
        return new CypressWidget(xpath, this);
    }
}