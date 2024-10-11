import AbstractListWidget from "../relish-core/AbstractListWidget";
import CypressWidget from "./CypressWidget";
import Component from "../relish-core/Component";
import TableRow from "../relish-core/TableRow";

/// <reference types='cypress' />

export default abstract class CypressAbstractListWidget<
  T extends CypressWidget
> extends AbstractListWidget<string | HTMLElement, T> {
  subSelector: string;
  creator: (e: HTMLElement) => T;

  constructor(
    selector: string | HTMLElement,
    subSelector: string,
    creator: (e: HTMLElement) => T,
    parent: Component
  ) {
    super(new CypressWidget(selector, parent), parent);
    this.subSelector = subSelector;
    this.creator = creator;
  }

  // protected abstract createItem(e: HTMLElement): T;

  protected items(): string[] | null {
    //TODO
    return null;
  }

  assertVisible() {
    // Do nothing
  }

  assertEmpty() {
    this.getChainer()
      .find(this.subSelector)
      .should("not.exist");
  }

  //TODO Conflicts with assertChildCount. Try to fix the name
  public assertTheChildCount(expectedCount: number, predicate: any): void {
    //TODO
  }

  public allShouldBe(condition: any): void {
    //TODO
  }

  getChainer(): Cypress.Chainable {
    const selector = this.get();
    if (typeof selector !== "string") {
      throw "Cannot get chainer for non-string selector: " + selector;
    }
    let parent1 = this.getParent();
    if (parent1 instanceof CypressWidget) {
      return (parent1 as CypressWidget).getChainer().find(selector);
    }
    if (parent1 instanceof CypressAbstractListWidget) {
      return (parent1 as CypressAbstractListWidget<CypressWidget>)
        .getChainer()
        .find(selector);
    }
    return cy.get(selector as string);
  }

  matches(tableRows: TableRow[]) {
    const assertion = ($elems: any) => {
      try {
        try {
          expect($elems.length === tableRows.length).equals(true);
        } catch (e) {
          let description = "";
          for (let i = 0; i < $elems.length; i++) {
            const elem = $elems[i];
            description += elem + "(" + elem.innerHTML + "), ";
          }
          throw new Error(
            `Wrong number of elements found. Expected ${tableRows.length} but found ${$elems.length}. Elements are ${description}`
          );
        }
        for (let i = 0; i < $elems.length; i++) {
          const tableRow = tableRows[i];
          const elem = $elems[i];
          let cypressWidget = this.creator(elem);
          cypressWidget.matches(tableRow);
        }
      } catch (e) {
        if (e.toString().indexOf("CypressError") !== -1) {
          console.error(e);
        }
        throw e;
      }
    };

    if (
      this.subSelector.indexOf("//") === 0 ||
      this.subSelector.indexOf("./") === 0
    ) {
      this.getChainer()
        .xpath(this.subSelector)
        .should(assertion);
    } else {
      this.getChainer()
        .find(this.subSelector)
        .should(assertion);
    }
  }

  screenshot() {
    this.getChainer().screenshot();
  }
}
