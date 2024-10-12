import Widget from "../relish-core/Widget";
import CypressAbstractListWidget from "./CypressAbstractListWidget";
import Component from "../relish-core/Component";
import TableRow from "../relish-core/TableRow";
import "cypress-xpath";
import ClickOptions = Cypress.ClickOptions;

// <reference path="cypress/types/index.d.ts" />

export default class CypressWidget extends Widget<string | HTMLElement> {
  selector: string | HTMLElement;
  baseSelector: string | HTMLElement;
  parent: Component;

  constructor(selector: string | HTMLElement, parent: Component) {
    super(
      typeof selector === "string" &&
        parent instanceof CypressWidget &&
        (parent as CypressWidget).isElementBased()
        ? parent.findElement(selector)
        : selector,
      parent
    );
    this.selector =
      typeof selector === "string" &&
      parent instanceof CypressWidget &&
      (parent as CypressWidget).isElementBased()
        ? parent.findElement(selector)
        : selector;
    this.baseSelector = selector;
    this.parent = parent;
  }

  getParent() {
    return this.parent;
  }

  matches(s: string | TableRow | object[]) {
    this.scrollTo();
    this.matchesWithoutScrolling(s);
  }

  matchesWithoutScrolling(s: string | TableRow | object[]) {
    if (s instanceof TableRow) {
      super.matches(s as TableRow);
    } else if (typeof s === "string") {
      if (typeof this.selector !== "string") {
        if (!this.selector) {
          throw "Cannot find element: " +
            this.baseSelector +
            " inside " +
            (this.getParent().constructor as any).name;
        }
        expect(this.matcher(this.selector).trim()).equals(s.trim());
      } else {
        this.getChainer().should($elems => {
          return expect(this.matcher($elems[0]).trim()).equals(s.trim());
        });
      }
    }
  }

  matcher(e: HTMLElement) {
    return e.innerText;
  }

  assertHasClass(className: string) {
    return this.getChainer().should('have.class', className)
  }

  assertDoesNotHaveClass(className: string) {
    return this.getChainer().should('not.have.class', className)
  }

  assertVisible() {
    if (this.parent) {
      this.parent.assertVisible();
    }
    if (typeof this.selector !== "string") {
      return;
    }
    return this.getChainer().should("be.visible");
  }

  getChainer(): Cypress.Chainable {
    const selector = this.get();
    if (this.isElementBased()) {
      return cy.wrap(selector);
    }
    let parent1 = this.getParent();
    if (parent1 instanceof CypressWidget) {
      if (
        typeof selector === "string" &&
        (selector.indexOf("//") === 0 || selector.indexOf("./") === 0)
      ) {
        return (parent1 as CypressWidget)
          .getChainer()
          .xpath(selector as string);
      }
      return (parent1 as CypressWidget).getChainer().find(selector as string);
    }
    if (parent1 instanceof CypressAbstractListWidget) {
      if (
        typeof selector === "string" &&
        (selector.indexOf("//") === 0 || selector.indexOf("./") === 0)
      ) {
        return (parent1 as CypressAbstractListWidget<CypressWidget>)
          .getChainer()
          .xpath(selector as string);
      }
      return (parent1 as CypressAbstractListWidget<CypressWidget>)
        .getChainer()
        .find(selector as string);
    }
    if (
      typeof selector === "string" &&
      (selector.indexOf("//") === 0 || selector.indexOf("./") === 0)
    ) {
      return cy.xpath(selector as string);
    }
    return cy.get(selector as string);
  }

  isElementBased() {
    return this.selector && this.selector.toString().indexOf("Element") !== -1;
  }

  findElement(s: string): HTMLElement {
    if (!this.isElementBased()) {
      throw "Widget not based on raw element";
    }
    return (this.get() as HTMLElement).querySelector(s) as HTMLElement;
  }

  assertInvisible() {
    if (this.isElementBased()) {
      throw "Element exists: " + this.selector;
    }
    return this.getChainer().should("not.be.visible");
  }

  get(): string | HTMLElement {
    return this.selector;
  }

  getElement(): HTMLElement {
    if (!this.isElementBased()) {
      throw "Not based on a raw element";
    }
    return this.get() as HTMLElement;
  }

  click(): void {
    if (this.isElementBased()) {
      this.getElement().click();
    } else {
      this.getChainer().click();
    }
  }

  shiftClick() {
    if (this.isElementBased()) {
      throw "Cannot shift click on element yet....";
    } else {
      return this.getChainer().click({
        shiftKey: true
      } as any);
    }
  }

  scrollTo() {
    if (this.isElementBased()) {
      return this.getElement().scrollIntoView();
    } else {
      return this.getChainer().scrollIntoView();
    }
  }

  trigger<K extends keyof DocumentEventMap>(eventName: any, options: Partial<any> | undefined) {
    return this.getChainer().trigger(eventName, options);
  }

  type(s: string, options?: Partial<Cypress.TypeOptions> | undefined) {
    return this.getChainer().type(s, options);
  }

  assertDisabled() {
    return this.getChainer().should("be.disabled");
  }

  assertEnabled() {
    return this.getChainer().should("not.be.disabled");
  }

  screenshot() {
    return this.getChainer().screenshot();
  }
}
