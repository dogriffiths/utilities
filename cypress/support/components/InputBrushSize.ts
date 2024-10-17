import InputText from "../relish-cypress/InputText";

export default class InputBrushSize extends InputText {
  constructor(selector: any, parent: any) {
    super(selector, parent);
  }

  set(text: string): InputBrushSize {
    super.set(text);
    super.type("{enter}")
    return this;
  }
}
