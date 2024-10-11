import InputWidget from "./InputWidget";

const FALSISH = ["NO", "F", "N", "OFF", "0", "DISABLED", "0.0", "FALSE"];

export default class Checkbox extends InputWidget {
  constructor(selector: any, parent: any) {
    super(selector, parent);
  }

  set(value: string): Checkbox {
    this.getChainer().scrollIntoView();
    if (FALSISH.indexOf(value.toUpperCase()) > -1) {
      this.uncheck();
    } else {
      this.check();
    }
    return this;
  }

  matches(s: string) {
    if (typeof this.selector !== "string") {
      if (!this.selector) {
        throw "Cannot find element: " +
          this.baseSelector +
          " inside " +
          (this.getParent().constructor as any).name;
      }
      const expected = FALSISH.indexOf(s.toUpperCase()) === -1;
      expect(this.checkboxMatcher(this.selector as HTMLInputElement)).equals(
        expected
      );
    } else {
      this.getChainer().should($elems => {
        const expected = FALSISH.indexOf(s.toUpperCase()) === -1;
        return expect(this.checkboxMatcher($elems[0])).equals(expected);
      });
    }
  }

  checkboxMatcher(e: HTMLInputElement) {
    return e.checked;
  }

  check(): void {
    this.getChainer().check();
  }

  uncheck(): void {
    this.getChainer().uncheck();
  }
}
