import CypressWidget from "../relish-cypress/CypressWidget";
import Component from "../relish-core/Component";
import CypressPage from "../relish-cypress/CypressPage";

export default class DialogWidget extends CypressWidget {
    constructor(selector: string, page: CypressPage) {
        super(selector || '[role="dialog"]', page);
    }

    get title() {
        return new CypressWidget(".MuiDialogTitle-root", this);
    }

    get cancelButton() {
        return this.button("Cancel");
    }

    cancel() {
        this.cancelButton.click();
    }

    button(name: string) {
        const xpath = `//button//*[text()='${name}']`;
        return new CypressWidget(xpath, this);
    }
}
