import Component from "../relish-core/Component";
import CypressWidget from "./CypressWidget";
import CollectionWidget from "./CollectionWidget";

// <reference path="cypress/types/index.d.ts" />

function terminalLog(violations: any[]) {
    cy.task(
        'log',
        `${violations.length} accessibility violation${
            violations.length === 1 ? '' : 's'
        } ${violations.length === 1 ? 'was' : 'were'} detected`
    )
    // pluck specific keys to keep the table readable
    const violationData = violations.map(
        ({id, impact, description, nodes}) => ({
            debugTitle: 'XXX', // To make it easier to find in the console
            id,
            impact,
            description,
            nodes: nodes.length,
            html: nodes.map((i: any) => i.html).join(' ')
        })
    )

    cy.task('table', violationData)
    console.table(violationData)
}


class CypressPage extends Component {
    path: string;

    constructor(path: string) {
        super(null);
        this.path = path;
    }

    getPath(): string {
        return this.path;
    }

    get body() {
        return new CypressWidget("body", this);
    }

    type(s: string) {
        this.body.type(s)
    }

    assertVisible() {
        cy.url().should(url =>
            expect(url).to.satisfy(
                (u: string) => this.matchesUrl(u),
                `Page never became visible. URL is ${url}`
            )
        );
    }

    assertInvisible() {
        cy.url().should(url =>
            expect(url).to.satisfy(
                (u: string) => !this.matchesUrl(u),
                `Page never became invisible. URL is ${url}`
            )
        );
    }

    assertAccessible() {
        this.assertVisible();
        cy.injectAxe();
        cy.checkA11y(undefined, {
            includedImpacts: ['critical']
        }, terminalLog);
    }

    matchesUrl(currentUrl: string): boolean {
        return currentUrl === `${Cypress.config().baseUrl}${this.getPath()}`;
    }

    // @ts-ignore
    collection<T>(itemSelector: string, itemFactory: (element: HTMLElement) => T, parentSelector: string = ':self'): CollectionWidget<T> {
        // @ts-ignore
        return new CollectionWidget<T>(parentSelector, itemSelector, itemFactory, this);
    }

    refreshPage() {
        cy.reload();
    }

    launch() {
        const url = `${this.getPath()}`;
        cy.visit(url);
    }
}

export default CypressPage;
