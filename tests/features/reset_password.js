import faker from 'faker';

describe('パスワードリセット @watch', function() {
  it('forgot-passwordページまで移動できる', function() {
    browser.url('http://localhost:3000/');
    browser.waitForExist('.sign-in');
    browser.click('.sign-in');
    browser.waitForExist('.forgot-password');
    browser.click('.forgot-password');

    expect(browser.waitForExist('.forgot-password-button')).to.equal(true);
  });

  it('登録されてないメールアドレスを入力したらエラーメッセージが表示される。', function() {
    browser.waitForExist('#input-reset-email');
    browser.setValue('#input-reset-email', faker.internet.email());
    browser.waitForExist('.forgot-password-button');
    browser.click('.forgot-password-button');

    expect(browser.waitForExist('.s-alert-box-inner')).to.equal(true);
  });
});
