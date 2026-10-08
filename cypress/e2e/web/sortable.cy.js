import sortable from "../../pages/SortablePage";
import { ascendingOrder } from "../../support/data/sortable";

describe("Sortable", () => {
    it("drags the list into ascending order", () => {
        sortable.openSortable();
        sortable.itemTexts().should("deep.equal", ascendingOrder);

        sortable.dragOnto(ascendingOrder.at(-1), ascendingOrder[0]);
        sortable.itemTexts().should("not.deep.equal", ascendingOrder);

        sortable.sortAscending(ascendingOrder);
        sortable.itemTexts().should("deep.equal", ascendingOrder);
    });
});
