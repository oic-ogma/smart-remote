describe('言語切り替え', function() {
  it('アプリケーションの言語を日本語に変える', function() {
    browser.url('http://localhost:3000');
    browser.waitForExist('#language-selector');
    browser.click('#language-selector');
    browser.click('#lang-ja');

    expect(browser.getText('#language-selector')).to.equal('ja');
  });

  it('アプリケーションの言語を英語に変える', function() {
    browser.url('http://localhost:3000');
    browser.waitForExist('#language-selector');
    browser.click('#language-selector');
    browser.click('#lang-en');

    expect(browser.getText('#language-selector')).to.equal('en');
  });
});
