import InputWidget from "../relish-cypress/InputWidget";
import InputTextNeedingEnter from "./InputTextNeedingEnter";
import CypressWidget from "../relish-cypress/CypressWidget";
import RoundButtonWidget from "./RoundButtonWidget";

export default class Tools extends InputWidget {
  constructor(selector: any, parent: any) {
    super(selector, parent);
  }

  matches(s: string) {
    this.brushSizeDisplay.matches(s)
  }

  set(text: string): Tools {
    this.brushSizeDisplay.set(text)
    return this;
  }

  get clearButton() {
    return new CypressWidget('#clearBtn', this);
  }

  pen() {
    this.penButton.click();
  }

  clear() {
    this.clearButton.click();
  }

  undo() {
    this.undoButton.click();
  }

  eraser() {
    this.eraserButton.click();
  }

  highlighter() {
    this.highlighterButton.click();
  }

  get penButton() {
    return new RoundButtonWidget('#penBtn', this);
  }

  get undoButton() {
    return new RoundButtonWidget('#undoBtn', this);
  }
  get eraserButton() {
    return new RoundButtonWidget('#eraserBtn', this);
  }

  get brushSizeDisplay() {
    return new InputTextNeedingEnter('#brushSizeDisplay', this);
  }

  get highlighterButton() {
    return new RoundButtonWidget('#highlighterBtn', this);
  }
}
