const { defineConfig } = require("cypress");

module.exports = defineConfig({
    // Add projectId from Cypress Cloud → Project Settings before npm run cy:record.
    // The record key stays in CYPRESS_RECORD_KEY.
    // runMode retries are what Cloud uses to flag a flaky test.
    retries: {
        runMode: 2,
        openMode: 0,
    },
    // Drop the ad iframes that cover buttons at the bottom of DemoQA.
    blockHosts: [
        "*googlesyndication.com",
        "*doubleclick.net",
        "*googleadservices.com",
        "*googletagservices.com",
        "*adnxs.com",
    ],
    e2e: {
        baseUrl: "https://demoqa.com",
        specPattern: "cypress/e2e/**/*.cy.js",
    },
});
