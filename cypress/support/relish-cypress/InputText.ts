import InputWidget from "./InputWidget";

export default class InputText extends InputWidget {
  constructor(selector: any, parent: any) {
    super(selector, parent);
  }

  enterText(text: string): void {
    this.getChainer()
      .click()
      .clear()
      .type(text);
  }

  enterTextSlow(text: string): void {
    this.getChainer()
      .click()
      .clear()
      .type(text, { delay: 1000 });
  }

  set(text: string): InputText {
    this.scrollTo();
    if (text) {
      this.enterText(text);
    } else {
      this.getChainer()
        .click()
        .clear();
    }
    return this;
  }

  setSlow(text: string): InputText {
    this.scrollTo();
    if (text) {
      this.enterTextSlow(text);
    } else {
      this.getChainer()
        .click()
        .clear();
    }
    return this;
  }

  sendKeys(s: string) {
    this.getChainer().type(s);
  }

  clear(): void {
    this.getChainer().clear();
  }
}
