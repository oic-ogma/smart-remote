module.exports = function() {

  this.Given(/^I am at register page$/, function() {
    browser.url('http://localhost:3000/register');
  });

  this.When(/^I use the language selector to switch language to Japanese$/, function() {
    browser.waitForExist("#language-selector");
    browser.click("#language-selector");
    browser.click("#lang-ja");
  });

  this.Then(/^the application language should be set to Japanese$/, function() {
    expect(browser.getText("#language-selector")).toEqual("ja");
  });

  this.When(/^I use the language selector to switch language to English$/, function() {
    browser.waitForExist("#language-selector");
    browser.click("#language-selector");
    browser.click("#lang-en");
  });

  this.Then(/^the application language should be set to English$/, function() {
    expect(browser.getText("#language-selector")).toEqual("en");
  });

  this.When(/^Email error$/, function() {
    browser.waitForExist("#input-email");
    browser.setValue("#input-email", "test");
    browser.click("#input-confirm-email");
  });

  this.Then(/^Email error message$/, function() {
    expect(browser.waitForExist("#input-email")).toBe(true);
  });

  this.When(/^Email success$/, function() {
    browser.waitForExist("#input-email");
    browser.setValue("#input-email", "test@test.com");
    browser.click("body");
  });

  this.Then(/^Email success message$/, function() {
    expect(browser.waitForExist("#input-email")).toBe(true);
  });

  this.When(/^Confirm email error$/, function() {
    browser.waitForExist("#input-email");
    browser.setValue("#input-email", "test@test.com");
    browser.click("#input-confirm-email");
    browser.waitForExist("#input-confirm-email");
    browser.setValue("#input-confirm-email", "test@test");
    browser.click("body");
  });

  this.Then(/^Confirm email error message$/, function() {
    expect(browser.waitForExist("#input-email")).toBe(true);
  });

  this.When(/^Confirm email success$/, function() {
    browser.waitForExist("#input-email");
    browser.setValue("#input-email", "test@test.com");
    browser.click("#input-confirm-email");
    browser.waitForExist("#input-confirm-email");
    browser.setValue("#input-confirm-email", "test@test.com");
    browser.click("body");
  });

  this.Then(/^Confirm email success message$/, function() {
    var element = browser.getText("#input-confirm-email");
    expect(browser.getText("#input-email")).toEqual(element);
  });
};
