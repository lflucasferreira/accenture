import webTables from "../../pages/WebTablesPage";
import { buildWebTableRecord } from "../../support/data/webTable";

describe("Web Tables", () => {
    it("creates, edits, and deletes a record", () => {
        const record = buildWebTableRecord();

        webTables.openWebTables();
        webTables.shouldShowTable();
        webTables.addRecord(record);
        webTables.rowByEmail(record.email).should("contain", record.department);

        webTables.editDepartment(record.email, record.updatedDepartment);
        webTables.rowByEmail(record.email).should("contain", record.updatedDepartment);

        webTables.deleteByEmail(record.email);
        webTables.tableBody().should("not.contain", record.email);
    });
});
