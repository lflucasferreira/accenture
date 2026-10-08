// DemoQA rejects a password without upper, lower, digit, and a special character.
const password = "Password@123";

function buildBookstoreUser() {
    return {
        userName: `user_${Date.now()}`,
        password,
    };
}

export {
    password,
    buildBookstoreUser,
};
