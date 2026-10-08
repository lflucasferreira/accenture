import { openSection } from "../support/helpers/navigation";

class ProgressBarPage {
    openProgressBar() {
        openSection("Widgets", "Progress Bar");
    }

    shouldShowProgressBar() {
        cy.get("#startStopButton").should("be.visible");
    }

    start() {
        cy.get("#startStopButton").click();
    }

    stopBefore(limit) {
        // Wait until the bar has moved and is still within the limit, then stop.
        cy.get("[role='progressbar']", { timeout: 10000 }).should(($bar) => {
            const value = Number($bar.attr("aria-valuenow"));
            expect(value).to.be.greaterThan(0).and.at.most(limit);
        });
        cy.get("#startStopButton").click();
    }

    progressBar() {
        return cy.get("[role='progressbar']");
    }

    shouldHaveValueAtMost(limit) {
        this.progressBar().should(($bar) => {
            expect(Number($bar.attr("aria-valuenow"))).to.be.at.most(limit);
        });
    }

    waitUntilComplete() {
        cy.get("[role='progressbar']", { timeout: 20000 }).should("have.attr", "aria-valuenow", "100");
    }

    reset() {
        // One DOM click. Cypress mouseup would land on Start after React swaps the button.
        cy.get("#resetButton").then(($button) => {
            $button[0].click();
        });
    }
}

export default new ProgressBarPage();
