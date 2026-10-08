import "./commands";
import "cypress-real-events";

// DemoQA still calls findDOMNode on some clicks. Ignore only that error.
Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("findDOMNode")) {
        return false;
    }
});
