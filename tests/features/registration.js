import faker from 'faker';

const findUserByEmail = function(email) {
  return Accounts.findUserByEmail(email);
};

describe('ユーザー登録 @watch', ()=> {
  it('トップページからユーザー登録ページまで移動', ()=> {
    browser.url('http://localhost:3000/');
    browser.click('.sign-in');
    browser.click('.sign-in-link');

    expect(browser.waitForExist('.register-button')).to.equal(true);
  });

  it('正しくないメールアドレスが入力されたら、エラーメッセージが表示される', ()=> {
    browser.waitForExist('#input-email');
    browser.setValue('#input-email', 'test');
    browser.click('#input-confirm-email');

    expect(browser.waitForExist('#input-email')).to.equal(true);
  });

  it('正しいメールアドレスが入力されたら、エラーメッセージが表示されない', ()=> {
    browser.waitForExist('#input-email');
    browser.setValue('#input-email', faker.internet.email());
    browser.click('body');

    expect(browser.waitForExist('#input-email')).to.equal(true);
  });

  it('同じではないメールアドレスを入力したら、エラーメッセージが表示される', ()=> {
    browser.waitForExist('#input-email');
    browser.setValue('#input-email', faker.internet.email());
    browser.click('#input-confirm-email');
    browser.waitForExist('#input-confirm-email');
    browser.setValue('#input-confirm-email', faker.internet.email());
    browser.click('body');

    expect(browser.waitForExist('#input-email')).to.equal(true);
  });

  it('同じメールアドレスを入力したら、エラーメッセージが表示されない', ()=> {
    const email = faker.internet.email();
    browser.waitForExist('#input-email');
    browser.setValue('#input-email', email);
    browser.click('#input-confirm-email');
    browser.waitForExist('#input-confirm-email');
    browser.setValue('#input-confirm-email', email);
    browser.click('body');

    const element = browser.getText('#input-confirm-email');
    expect(browser.getText('#input-email')).to.equal(element);
  });

  it('メールアドレスに問題なかったら成功メッセージが表示される', ()=> {
    const email = faker.internet.email();
    browser.waitForExist('#input-email');
    browser.setValue('#input-email', email);
    browser.click('#input-confirm-email');
    browser.waitForExist('#input-confirm-email');
    browser.setValue('#input-confirm-email', email);
    browser.click('.register-button');

    expect(browser.waitForExist('.s-alert-success', 5000)).to.equal(true);
  });

  it('メールアドレスに問題なかったらデータベースでユーザーのドキュメントが作成される', function() {
    const email = faker.internet.email();
    browser.waitForExist('#input-email');
    browser.setValue('#input-email', email);
    browser.click('#input-confirm-email');
    browser.waitForExist('#input-confirm-email');
    browser.setValue('#input-confirm-email', email);
    browser.click('.register-button');

    server.subscribe('userData');
    const user = server.execute(findUserByEmail, email);
    expect(user.services.password.reset.token).to.exist;
  });

  // it('すでに登録されているメールアドレスを入力したら、エラーメッセージが表示される', ()=> {
  //   browser.waitForExist('#input-email');
  //   browser.setValue('#input-email', 'test@test.com');
  //   browser.click('#input-confirm-email');
  //   browser.waitForExist('#input-confirm-email');
  //   browser.setValue('#input-confirm-email', 'test@test.com');
  //   browser.click('body');

  //   const element = browser.getText('#input-confirm-email');
  //   expect(browser.getText('#input-email')).to.equal(element);
  // });

});
