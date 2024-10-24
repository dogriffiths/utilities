import Component from "../relish-core/Component";
import OverviewItemWidget from "./OverviewItemWidget";
import CollectionWidget from "../relish-cypress/CollectionWidget";

export default class OverviewContainer extends CollectionWidget<OverviewItemWidget> {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(
            selector,
            '.overviewItem',
            (e) => {
                return new OverviewItemWidget(e, this);
            },
            parent
        );
    }
}
