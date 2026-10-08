import { buildBookstoreUser } from "../../support/data/bookstoreUser";

describe("DemoQA Book Store API", () => {
    const userUrl = "/Account/v1/User";
    const tokenUrl = "/Account/v1/GenerateToken";
    const authorizedUrl = "/Account/v1/Authorized";
    const booksUrl = "/BookStore/v1/Books";

    // One test on purpose. Each step returns ids the next request needs.
    // A Cloud retry reruns only the failed test, so this flow cannot be split.
    it("creates a user, reserves two books, and returns them on the user", () => {
        const credentials = buildBookstoreUser();

        // Create the user and keep the userId for the later calls.
        cy.request({
            method: "POST",
            url: userUrl,
            body: credentials,
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.userID).to.be.a("string").and.not.be.empty;
            expect(response.body.username).to.eq(credentials.userName);
            return response.body.userID;
        }).then((userId) => {
            // Generate a bearer token with the same credentials.
            return cy.request({
                method: "POST",
                url: tokenUrl,
                body: credentials,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.status).to.eq("Success");
                expect(response.body.token).to.be.a("string").and.not.be.empty;
                return { userId, token: response.body.token };
            });
        }).then(({ userId, token }) => {
            // Confirm the user is authorized before touching the bookstore.
            return cy.request({
                method: "POST",
                url: authorizedUrl,
                body: credentials,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.eq(true);
                return { userId, token };
            });
        }).then(({ userId, token }) => {
            // Read the catalog and pick two ISBNs.
            return cy.request({
                method: "GET",
                url: booksUrl,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.books).to.be.an("array").and.not.be.empty;
                const bookIsbns = Cypress._.sampleSize(response.body.books, 2).map((book) => book.isbn);
                expect(bookIsbns).to.have.length(2);
                return { userId, token, bookIsbns };
            });
        }).then(({ userId, token, bookIsbns }) => {
            // Reserve those two books for this user.
            return cy.request({
                method: "POST",
                url: booksUrl,
                headers: { Authorization: `Bearer ${token}` },
                body: {
                    userId,
                    collectionOfIsbns: bookIsbns.map((isbn) => ({ isbn })),
                },
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body.books).to.have.length(2);
                return { userId, token, bookIsbns };
            });
        }).then(({ userId, token, bookIsbns }) => {
            // Load the user and check that both reserved books are listed.
            cy.request({
                method: "GET",
                url: `${userUrl}/${userId}`,
                headers: { Authorization: `Bearer ${token}` },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.userId).to.eq(userId);
                expect(response.body.username).to.eq(credentials.userName);
                expect(response.body.books).to.have.length(2);
                const returnedIsbns = response.body.books.map((book) => book.isbn);
                expect(returnedIsbns).to.have.members(bookIsbns);
            });
        });
    });
});
