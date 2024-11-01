import Component from "../relish-core/Component";
import CypressWidget from "../relish-cypress/CypressWidget";
import InputText from "../relish-cypress/InputText";
import Comment from "./Comment";
import Checkbox from "../relish-cypress/Checkbox";

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
        return new CypressWidget('.dialog-buttons .save', this);
    }

    get completeButton() {
        return new CypressWidget('.dialog-buttons .complete', this);
    }

    get newComment() {
        return new InputText('.comment-input input', this);
    }
    get reset() {
        return new Checkbox('#editTaskResetDaily', this);
    }

    get saveCommentButton() {
        return new InputText('.comment-input button', this);
    }

    get comments() {
        return this.collection(
            '.comment-item',
            e => new Comment(e, this),
            '.comments-list'
        );
    }
}
