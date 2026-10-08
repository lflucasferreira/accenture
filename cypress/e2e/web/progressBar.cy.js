import progressBar from "../../pages/ProgressBarPage";

describe("Progress Bar", () => {
    it("stops before 25 percent and resets at 100 percent", () => {
        progressBar.openProgressBar();
        progressBar.shouldShowProgressBar();

        progressBar.start();
        progressBar.stopBefore(25);
        progressBar.shouldHaveValueAtMost(25);

        progressBar.start();
        progressBar.waitUntilComplete();
        progressBar.reset();
        progressBar.shouldHaveValueAtMost(0);
    });
});
