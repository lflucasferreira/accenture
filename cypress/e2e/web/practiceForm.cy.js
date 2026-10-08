import practiceForm from "../../pages/PracticeFormPage";
import { buildPracticeForm } from "../../support/data/practiceForm";

describe("Practice Form", () => {
    it("submits the practice form and closes the confirmation popup", () => {
        const form = buildPracticeForm();

        practiceForm.openPracticeForm();
        practiceForm.shouldShowForm();
        practiceForm.fillTextFields(form);
        practiceForm.selectGender(form.gender);
        practiceForm.selectHobby(form.hobby);
        practiceForm.selectDateOfBirth(form);
        practiceForm.selectSubject(form.subject);
        practiceForm.selectState(form.state);
        practiceForm.selectCity(form.city);
        practiceForm.uploadFile("upload-sample.txt");
        practiceForm.submit();
        practiceForm.modalTitle().should("be.visible").and("have.text", "Thanks for submitting the form");
        practiceForm.closeModal();
    });
});
