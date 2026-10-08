import { openSection } from "../support/helpers/navigation";

class PracticeFormPage {
    openPracticeForm() {
        openSection("Forms", "Practice Form");
    }

    shouldShowForm() {
        cy.get("#firstName").should("be.visible");
    }

    fillTextFields({ firstName, lastName, email, mobile, address }) {
        cy.get("#firstName").type(firstName);
        cy.get("#lastName").type(lastName);
        cy.get("#userEmail").type(email);
        cy.get("#userNumber").type(mobile);
        cy.get("#currentAddress").type(address);
    }

    selectGender(gender) {
        // The input is covered. The wrapper id on the site is genterWrapper.
        cy.get("#genterWrapper").contains("label", gender).click();
    }

    selectHobby(hobby) {
        cy.get("#hobbiesWrapper").contains("label", hobby).click();
    }

    selectDateOfBirth({ month, year, day }) {
        cy.get("#dateOfBirthInput").click();
        cy.get(".react-datepicker__month-select").select(month);
        cy.get(".react-datepicker__year-select").select(year);
        // ^day$ so day 1 does not match 15. Outside-month cells repeat the same numbers.
        cy.get(".react-datepicker__day")
            .not(".react-datepicker__day--outside-month")
            .contains(new RegExp(`^${day}$`))
            .click();
    }

    selectSubject(subject) {
        // Enter submits the form. Click the suggestion instead.
        cy.get("#subjectsInput").type(subject);
        cy.contains(".subjects-auto-complete__option", subject).click();
    }

    selectState(state) {
        cy.get("#state").scrollIntoView().click();
        cy.get("[id^='react-select'][id*='option']").contains(state).click();
    }

    selectCity(city) {
        // City stays disabled until selectState has chosen a state.
        cy.get("#city").scrollIntoView().click();
        cy.get("[id^='react-select'][id*='option']").contains(city).click();
    }

    uploadFile(fileName) {
        cy.get("#uploadPicture").scrollIntoView().selectFile(`cypress/fixtures/${fileName}`);
    }

    submit() {
        cy.get("#submit").click();
    }

    modalTitle() {
        return cy.get("#example-modal-sizes-title-lg");
    }

    closeModal() {
        // Close throws findDOMNode and leaves the dialog open. The click is the step.
        cy.get("#closeLargeModal").click();
    }
}

export default new PracticeFormPage();
