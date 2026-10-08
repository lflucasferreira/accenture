import { openSection } from "../support/helpers/navigation";

class WebTablesPage {
    openWebTables() {
        openSection("Elements", "Web Tables");
    }

    shouldShowTable() {
        cy.get(".web-tables-wrapper").should("be.visible");
        cy.get("#addNewRecordButton").should("be.visible");
    }

    addRecord({ firstName, lastName, email, age, salary, department }) {
        cy.get("#addNewRecordButton").click();
        this.fillForm({ firstName, lastName, email, age, salary, department });
        cy.get("#submit").click();
    }

    editDepartment(email, department) {
        // The email is unique per run, so edit and delete hit the row this test created.
        cy.contains(".web-tables-wrapper tbody tr", email).find("[title='Edit']").click();
        cy.get("#department").clear().type(department);
        cy.get("#submit").click();
    }

    deleteByEmail(email) {
        cy.contains(".web-tables-wrapper tbody tr", email).find("[title='Delete']").click();
    }

    rowByEmail(email) {
        return cy.contains(".web-tables-wrapper tbody tr", email);
    }

    tableBody() {
        return cy.get(".web-tables-wrapper tbody");
    }

    fillForm({ firstName, lastName, email, age, salary, department }) {
        cy.get("#firstName").clear().type(firstName);
        cy.get("#lastName").clear().type(lastName);
        cy.get("#userEmail").clear().type(email);
        cy.get("#age").clear().type(String(age));
        cy.get("#salary").clear().type(String(salary));
        cy.get("#department").clear().type(department);
    }
}

export default new WebTablesPage();
