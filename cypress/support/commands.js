// The fixed footer and #fixedban stay in the DOM even after blockHosts.
Cypress.Commands.add("removeAds", () => {
    cy.document().then((doc) => {
        doc.querySelector("#fixedban")?.remove();
        doc.querySelector("footer")?.remove();
    });
});
