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
};
