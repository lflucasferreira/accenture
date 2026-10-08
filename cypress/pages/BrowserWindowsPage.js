import { openSection } from "../support/helpers/navigation";

class BrowserWindowsPage {
    openBrowserWindows() {
        openSection("Alerts, Frame & Windows", "Browser Windows");
    }

    openNewWindow() {
        // Cypress stays in one tab, so capture the URL window.open would load.
        cy.window().then((win) => {
            cy.stub(win, "open").as("newWindow");
        });
        cy.get("#windowButton").click();
    }

    visitOpenedWindow() {
        // Follow the URL the stub captured, in this same tab.
        cy.get("@newWindow").then((stub) => {
            expect(stub).to.have.been.called;
            cy.visit(stub.getCall(0).args[0]);
        });
    }

    shouldShowSamplePage() {
        cy.contains("This is a sample page").should("be.visible");
    }

    closeOpenedWindow() {
        // Back to Browser Windows. There is no second window to close.
        cy.go("back");
    }

    shouldShowBrowserWindows() {
        cy.get("#windowButton").should("be.visible");
    }
}

export default new BrowserWindowsPage();
