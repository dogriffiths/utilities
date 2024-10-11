import CypressWidget from "./CypressWidget";

export default class InputWidget extends CypressWidget {
  constructor(selector: any, parent: any) {
    super(selector, parent);
  }

  matches(s: string) {
    this.scrollTo();
    this.getChainer().should($elems => {
      return expect($elems[0].value.trim()).equals((s as string).trim());
    });
  }
}
