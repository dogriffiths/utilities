import Widget from "../relish-core/Widget";
import CollectionWidget from "./CollectionWidget";
import Component from "../relish-core/Component";
import TableRow from "../relish-core/TableRow";
import "cypress-xpath";

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
            if ("[INVISIBLE]" === s) {
                this.assertInvisible();
                return;
            }
            if ("[VISIBLE]" === s) {
                this.assertVisible();
                return;
            }
            if ("[ENABLED]" === s) {
                this.assertEnabled();
                return;
            }
            if ("[DISABLED]" === s) {
                this.assertDisabled();
                return;
            }
            // @ts-ignore
            if (s.startsWith("[[") && s.endsWith("]]")) {
                s = s.substring(1, s.length - 1);
            }
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
                    // @ts-ignore
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
            let realSelector = selector || this.baseSelector;
            return (parent1 as CypressWidget).getChainer().find(realSelector as string);
        }

        if (parent1 instanceof CollectionWidget) {
            if (
                typeof selector === "string" &&
                (selector.indexOf("//") === 0 || selector.indexOf("./") === 0)
            ) {
                return (parent1 as CollectionWidget<CypressWidget>)
                    .getChainer()
                    .xpath(selector as string);
            }
            return (parent1 as CollectionWidget<CypressWidget>)
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
        console.trace();
        if (!this.isElementBased()) {
            throw "Widget not based on raw element";
        }
        return (this.get() as HTMLElement).querySelector(s) as HTMLElement;
    }

    assertInvisible() {
        if (this.isElementBased()) {
            throw "Element exists: " + this.selector;
        }
        return this.getChainer().should(($el) => {
            if ($el.length) {
                // Element exists, now check if it is not visible
                expect($el).not.to.be.visible;
            } else {
                // Element does not exist
                expect($el).not.to.exist;
            }
        });
        //
        // return this.getChainer().should("not.be.visible");
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

    // @ts-ignore
    collection<T>(itemSelector: string, itemFactory: (element: HTMLElement) => T, parentSelector: string = ':self'): CollectionWidget<T> {
        // @ts-ignore
        return new CollectionWidget<T>(parentSelector, itemSelector, itemFactory, this);
    }

    screenshot(filename?: string, options?: Partial<Cypress.ScreenshotOptions> | undefined) {
        if (filename) {
            return this.getChainer().screenshot(filename, options);
        } else {
            return this.getChainer().screenshot();
        }
    }

    // Useful for checking a list of simple CypressWidgets against a table of values
    get content() {
        return this;
    }

    dragTo(target: CypressWidget, options: any = {}) {
        const dataTransfer = options?.dataTransfer || new DataTransfer();
        const offsetX = options?.offsetX || 0;
        const offsetY = options?.offsetY || 0;
        this.trigger('dragstart', {dataTransfer});


        target.getChainer().then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            const x = rect.left + (rect.width / 2) + offsetX;
            const y = rect.top + (rect.height / 2) + offsetY;

            cy.get($el).trigger('dragover', {dataTransfer, clientX: x, clientY: y});
        });

        target.getChainer().then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            const x = rect.left + (rect.width / 2) + offsetX;
            const y = rect.top + (rect.height / 2) + offsetY;

            cy.get($el).trigger('drop', {dataTransfer, clientX: x, clientY: y});
        });
    }
}
