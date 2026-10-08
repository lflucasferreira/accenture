# QA Automation Challenge — Accenture

JavaScript and Cypress automation for [DemoQA](https://demoqa.com/). The API spec covers the Book Store flow. The UI specs cover Practice Form, Web Tables, Browser Windows, Progress Bar, and Sortable.

## Prerequisites

- Node.js 20 or later
- npm

## Install

```bash
npm install
```

## Run

```bash
npm test
npm run cy:open
npm run cy:run:api
npm run cy:run:web
```

`npm test` and `npm run cy:run` execute the full suite. `cy:open` opens the Cypress app. `cy:run:api` runs `cypress/e2e/api`. `cy:run:web` runs `cypress/e2e/web`.

The Practice Form upload file is `cypress/fixtures/upload-sample.txt`.

## Cypress Cloud

`projectId` stays out of this repo until the Cloud project exists. The record key stays out of Git.

1. Create the project in [Cypress Cloud](https://cloud.cypress.io/) and copy the project id.
2. Add it to `cypress.config.js`: `projectId: "your-id"`.
3. Export the record key in the terminal:

```bash
export CYPRESS_RECORD_KEY=your-record-key
npm run cy:record
```

`cy:record` runs `cypress run --record`. In `runMode` each test retries twice. When one attempt fails and the next one passes, Cloud marks the test as flaky.

## Known DemoQA limitations

- The Practice Form Close button calls `findDOMNode` and the modal stays open. The test clicks Close and checks the title before that click. The handler in `cypress/support/e2e.js` ignores only that error message.
- Cypress drives one tab. In Browser Windows the test stores the URL passed to `window.open`, visits that URL, and returns to the previous screen.
- On the Progress Bar, Reset is a DOM click. A Cypress mouseup would land on the Start button that React renders in the same place.
