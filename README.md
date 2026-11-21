# QAProject

Playwright core library -> This has the browser automation Api only which launches chromium,firefox and webkit and gives you browser,browsercontext ,page,locators and so on... but gives no test runner. User has to write thier own testing framework and handle assertions, reporting  ...

@Playwright/test - >Built on top of core library, this provides the test runner. It includes browser automation api and gives everything else for E2E test runs like the test and expect,fixtures, parallel workers, playright.config.js with default settings ,html reporting/codegen/traceviewer and so on...


#Assignment-2 note

page fixture gives one ready-to-use page per test which PW creates and deletes automatically per test.
browserContext - creates a new browser session with fresh context which has no idea about the existing page if any. so when we created new browserconext of eventhub login page it had emailfield value as empty and not "beginner@sample.com" which was entered in the earlier page instance