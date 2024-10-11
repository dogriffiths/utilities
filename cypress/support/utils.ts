function table(s: TemplateStringsArray) {
    return s
        .toString()
        .split("\n")
        .map(i => i.trim())
        .filter(i => i)
        .map(r =>
            r
                .split("|")
                .slice(1, -1)
                .map(d => d.trim())
        );
}

const stringSized = (n: number): string => Array(n + 1).join("x");

function mockBoringPortalDiaryResponses() {
    cy.route({
        method: "GET",
        url: "/api/portal/*/*/pattern",
        status: 200,
        response: ''
    });
    cy.route({
        method: "GET",
        url: "/api/portal/*/*/person",
        status: 200,
        response: {}
    });
    cy.route({
        method: "GET",
        url: "/api/portal/*/holidays",
        status: 200,
        response: []
    });
    cy.route({
        method: "GET",
        url: "/api/portal/*/*/diary/*",
        status: 200,
        response: {}
    });
    cy.route("/api/portal/*/bookedTimes/*/*", {});
    cy.route("/api/portal/*/activities", {});
    cy.route("/api/portal/*/projects", {});
}
export { table, stringSized, mockBoringPortalDiaryResponses };
