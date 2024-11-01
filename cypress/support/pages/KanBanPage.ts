import CypressPage from "../relish-cypress/CypressPage";
import CypressWidget from "../relish-cypress/CypressWidget";
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
        return this.collection(
            '.column',
            e => new Column(e, this),
            '#board'
        );
    }
}
