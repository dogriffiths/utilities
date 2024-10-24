import CypressPage from "../relish-cypress/CypressPage";
import CypressWidget from "../relish-cypress/CypressWidget";
import CollectionWidget from "../relish-cypress/CollectionWidget";
import Column from "../components/Column";

// <reference path="cypress/types/index.d.ts" />

export default class KanBanPage extends CypressPage {
    constructor() {
        super("/kanban-board.html");
    }

    board(title: String): CypressWidget {
        return new CypressWidget(`.board:has(.column-title:contains("${title}"))`, this)
    }

    get columns() {
        const widget: CollectionWidget<Column> = new CollectionWidget<Column>(
            '#board',
            '.column',
            e => new Column(e, widget),
            this
        );
        return widget;
    }
}
