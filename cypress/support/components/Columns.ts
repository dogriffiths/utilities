import Component from "../relish-core/Component";
import CypressAbstractListWidget from "../relish-cypress/CypressAbstractListWidget";
import OverviewItemWidget from "./OverviewItemWidget";
import Column from "./Column";

export default class Columns extends CypressAbstractListWidget<Column> {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(
            selector,
            '.column',
            (e) => {
                return new Column(e, this);
            },
            parent
        );
    }

    item(index: number) {
        return new Column(`${this.subSelector}:nth-of-type(${index + 1})`, this.parent!!);
    }

    drag(srcIndex: number, targetIndex: number, offsetX: number) {
        this.item(srcIndex).dragTo(this.item(targetIndex), {offsetX: offsetX})
    }
}
