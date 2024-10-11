import CypressPage from "../relish-cypress/CypressPage";
import DialogWidget from "./DialogWidget";

export default class ErrorDialog extends DialogWidget {
    constructor(page: CypressPage) {
        super('.ErrorDialog', page);
    }
}
