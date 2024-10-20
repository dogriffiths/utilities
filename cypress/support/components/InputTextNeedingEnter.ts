import InputText from "../relish-cypress/InputText";

export default class InputTextNeedingEnter extends InputText {
  constructor(selector: any, parent: any) {
    super(selector, parent);
  }

  set(text: string): InputTextNeedingEnter {
    super.set(text);
    super.matches(text);
    super.type("{enter}")
    return this;
  }
}
