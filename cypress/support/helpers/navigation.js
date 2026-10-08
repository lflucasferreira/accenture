// Home card, then the sidebar item, then strip the banner once the screen is open.
function openSection(cardName, menuItem) {
    cy.visit("/");
    cy.contains(".card-body", cardName).scrollIntoView().click();
    cy.contains(".menu-list span", menuItem).click();
    cy.removeAds();
}

export { openSection };
