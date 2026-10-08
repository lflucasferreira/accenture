import { openSection } from "../support/helpers/navigation";

class SortablePage {
    openSortable() {
        openSection("Interactions", "Sortable");
        cy.get("#demo-tab-list").click();
    }

    itemTexts() {
        return cy.get("#demo-tabpane-list .list-group-item").then(($items) => {
            return [...$items].map((item) => item.innerText.trim());
        });
    }

    dragOnto(sourceText, targetText) {
        // The list ignores synthetic drag events, so this uses real mouse input.
        const list = "#demo-tabpane-list .list-group-item";

        cy.contains(list, new RegExp(`^${sourceText}$`))
            .realMouseDown({ button: "left", position: "center" })
            .realMouseMove(0, 10, { position: "center", keepMouseDownButton: "left" });

        cy.contains(list, new RegExp(`^${targetText}$`))
            .realMouseMove(0, 0, { position: "center", keepMouseDownButton: "left" })
            .realMouseUp({ position: "center" });
    }

    sortAscending(expected) {
        // Each drag changes the list, so the next read waits for the previous step.
        Cypress._.reduce(expected, (chain, label, index) => {
            return chain.then(() => {
                return this.itemTexts().then((current) => {
                    if (current[index] !== label) {
                        this.dragOnto(label, current[index]);
                    }
                });
            });
        }, cy.wrap(null));
    }
}

export default new SortablePage();
