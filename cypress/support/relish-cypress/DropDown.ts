import InputWidget from "./InputWidget";
import Component from "../relish-core/Component";

export default class DropDown extends InputWidget {
  constructor(selector: string, parent: Component) {
    super(selector, parent);
  }

  set(text: string): DropDown {
    this.getChainer().select(text);
    return this;
  }
}
