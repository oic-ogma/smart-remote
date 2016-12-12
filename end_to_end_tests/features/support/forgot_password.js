module.exports = function() {

  this.Given(/^I am at resetPassword page$/, function() {
    browser.url('http://localhost:3000/forgot-password');
  });

  this.When(/^reset Email error$/, function() {
    browser.waitForExist("#input-reset-email");
    browser.setValue("#input-reset-email", "test");
    browser.click("body");
  });

  this.Then(/^reset Email error message$/, function() {
    expect(browser.waitForExist("#input-reset-email")).toBe(true);
  });

  this.When(/^reset Email success$/, function() {
    browser.waitForExist("#input-reset-email");
    browser.setValue("#input-reset-email", "test@test.com");
    browser.click("body");
  });

  this.Then(/^reset Email success message$/, function() {
    expect(browser.waitForExist("#input-reset-email")).toBe(true);
  });
};
