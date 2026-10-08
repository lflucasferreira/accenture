const genders = ["Male", "Female", "Other"];
const hobbies = ["Sports", "Reading", "Music"];
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];
const subjects = ["Maths", "English", "Physics", "Chemistry"];

// City lists belong to one state. Merrut and Jaiselmer are the spellings on the page.
const states = {
    NCR: ["Delhi", "Gurgaon", "Noida"],
    "Uttar Pradesh": ["Agra", "Lucknow", "Merrut"],
    Haryana: ["Karnal", "Panipat"],
    Rajasthan: ["Jaipur", "Jaiselmer"],
};

function buildPracticeForm() {
    const suffix = Date.now();
    const state = Cypress._.sample(Object.keys(states));

    return {
        firstName: `Nome${suffix}`,
        lastName: `Sobrenome${suffix}`,
        email: `user_${suffix}@test.com`,
        mobile: String(suffix).slice(-10),
        address: `Rua ${suffix}`,
        gender: Cypress._.sample(genders),
        hobby: Cypress._.sample(hobbies),
        month: Cypress._.sample(months),
        year: String(Cypress._.random(1990, 2009)),
        day: String(Cypress._.random(1, 28)),
        subject: Cypress._.sample(subjects),
        state,
        city: Cypress._.sample(states[state]),
    };
}

export {
    genders,
    hobbies,
    months,
    subjects,
    states,
    buildPracticeForm,
};
