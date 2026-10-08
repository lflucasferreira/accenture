import browserWindows from "../../pages/BrowserWindowsPage";

describe("Browser Windows", () => {
    it("opens a new window and validates the sample page", () => {
        browserWindows.openBrowserWindows();
        browserWindows.openNewWindow();
        browserWindows.visitOpenedWindow();
        browserWindows.shouldShowSamplePage();
        browserWindows.closeOpenedWindow();
        browserWindows.shouldShowBrowserWindows();
    });
});
