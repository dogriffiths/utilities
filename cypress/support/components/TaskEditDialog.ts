import Component from "../relish-core/Component";
import CypressWidget from "../relish-cypress/CypressWidget";
import InputText from "../relish-cypress/InputText";
import CollectionWidget from "../relish-cypress/CollectionWidget";
import Comment from "./Comment";

export default class TaskEditDialog extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    get text() {
        return new InputText('#editTaskText', this);
    }

    get description() {
        return new InputText('#editTaskDescription', this);
    }

    get cancelButton() {
        return new CypressWidget('.dialog-buttons .cancel', this);
    }

    get saveButton() {
        return new CypressWidget('.dialog-buttons button:not(.cancel)', this);
    }

    get newComment() {
        return new InputText('.comment-input input', this);
    }

    get saveCommentButton() {
        return new InputText('.comment-input button', this);
    }

    get comments() {
        const widget: CollectionWidget<Comment> = new CollectionWidget<Comment>(
            '.comments-list',
            '.comment-item',
            e => new Comment(e, widget),
            this
        );
        return widget;
    }
}
