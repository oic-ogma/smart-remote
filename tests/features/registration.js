describe('登録ページ', function() {
  it('正しくないメールアドレスが入力されたら、エラーメッセージが表示される', function() {
    browser.url('http://localhost:3000/register');
    browser.waitForExist("#input-email");
    browser.setValue("#input-email", "test");
    browser.click("#input-confirm-email");

    expect(browser.waitForExist("#input-email")).to.equal(true);
  });

  it('正しいメールアドレスが入力されたら、エラーメッセージが表示されない', function() {
    browser.url('http://localhost:3000/register');
    browser.waitForExist("#input-email");
    browser.setValue("#input-email", "test@test.com");
    browser.click("body");

    expect(browser.waitForExist("#input-email")).to.equal(true);
  });

  it('同じではないメールアドレスを入力したら、エラーメッセージが表示される', function() {
    browser.url('http://localhost:3000/register');
    browser.waitForExist("#input-email");
    browser.setValue("#input-email", "test@test.com");
    browser.click("#input-confirm-email");
    browser.waitForExist("#input-confirm-email");
    browser.setValue("#input-confirm-email", "test@test");
    browser.click("body");

    expect(browser.waitForExist("#input-email")).to.equal(true);
  });

  it('同じメールアドレスを入力したら、エラーメッセージが表示されない', function() {
    browser.url('http://localhost:3000/register');
    browser.waitForExist("#input-email");
    browser.setValue("#input-email", "test@test.com");
    browser.click("#input-confirm-email");
    browser.waitForExist("#input-confirm-email");
    browser.setValue("#input-confirm-email", "test@test.com");
    browser.click("body");

    const element = browser.getText("#input-confirm-email");
    expect(browser.getText("#input-email")).to.equal(element);
  });
});
