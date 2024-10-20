import Component from "../relish-core/Component";
import CypressAbstractListWidget from "../relish-cypress/CypressAbstractListWidget";
import OverviewItemWidget from "./OverviewItemWidget";

export default class OverviewContainer extends CypressAbstractListWidget<OverviewItemWidget> {
    constructor(selector: string | HTMLElement, parent: Component) {
        // super(selector, '.overviewItem', (e) => new OverviewItemWidget(e, this), parent);
        super(
            selector,
            '.overviewItem',
            (e) => {
                return new OverviewItemWidget(e, this);
            },
            parent
        );
    }

    item(index: Number) {
        return new OverviewItemWidget(`#overviewItem-${index}`, this.parent!!);
    }

    drag(srcIndex: Number, targetIndex: Number, offsetX: Number) {
        this.item(srcIndex).dragTo(this.item(targetIndex), {offsetX: offsetX})
    }
}
