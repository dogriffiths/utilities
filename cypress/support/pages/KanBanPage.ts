import CypressPage from "../relish-cypress/CypressPage";
import CypressWidget from "../relish-cypress/CypressWidget";
import CanvasWidget from "../components/CanvasWidget";
import OverviewContainer from "../components/OverviewContainer";
import Navigation from "../components/Navigation";
import Tools from "../components/Tools";
import TableRow from "../relish-core/TableRow";
import Component from "../relish-core/Component";
import Columns from "../components/Columns";

// <reference path="cypress/types/index.d.ts" />

export default class KanBanPage extends CypressPage {
    constructor() {
        super("/kanban-board.html");
    }

    board(title: String): CypressWidget {
        return new CypressWidget(`.board:has(.column-title:contains("${title}"))`, this)
    }

    get columns() {
        return new Columns("#board", this)
    }
}
