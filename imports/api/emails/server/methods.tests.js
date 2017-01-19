import './methods';
import { chai } from 'meteor/practicalmeteor:chai';
import i18n from 'meteor/universe:i18n';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import faker from 'faker';
import { Accounts } from 'meteor/accounts-base';

const findUserByEmail = (address) => {
  return Meteor.users.findOne({'emails.0.address': address});
};

describe('メール', function() {
  describe('ユーザー登録', function() {
    beforeEach( function() {
      resetDatabase();
    });

    it('英語でメールを送信できる', function() {
      Meteor.call('sendEnrollmentEmail', 'en', faker.internet.email());
      chai.assert.equal(i18n.getLocale(), 'en');
    });

    it('日本語でメールを送信できる', function() {
      Meteor.call('sendEnrollmentEmail', 'ja', faker.internet.email());
      chai.assert.equal(i18n.getLocale(), 'ja');
    });

    it('対応してない言語のであれば、英語でメールが送信される', function() {
      Meteor.call('sendEnrollmentEmail', 'lv', faker.internet.email());
      chai.assert.equal(i18n.getLocale(), 'en');
    });

    it('無効なメールアドレス入力されたら、エラーがでる', function() {
      try {
        Meteor.call('sendEnrollmentEmail', 'en', 'invalid email address');
      } catch (Error) {
        chai.expect(Error.error).to.equal('Invalid parameters.');
      }
    });

    it('同じメールアドレスでもう一回登録しようとした、エラーがでる', function() {
      try {
        const email = faker.internet.email();
        Meteor.call('sendEnrollmentEmail', 'en', email);
        Meteor.call('sendEnrollmentEmail', 'en', email);
      } catch (Error) {
        chai.expect(Error.reason).to.equal('Email already exists.');
      }
    });
  });

  describe('パスワードリセット', function() {
    resetDatabase();
    const email = faker.internet.email();

    it('登録されてないユーザーにはパスワードリセットメールを送信できない', function() {
      try {
        Meteor.call('sendForgotPasswordEmail', 'en', email);
      } catch (Error) {
        chai.expect(Error.error).to.equal('Email address not found');
      }
    });

    it('登録されているユーザーにはパスワードリセットメールを送信できる', function() {
      Accounts.createUser({
        email: email,
        password: faker.lorem.word(),
      });
      Meteor.call('sendForgotPasswordEmail', 'en', email);

      const user = findUserByEmail(email);
      chai.expect(user.services.password.reset.token).to.exist;
    });

    it('5分以内もう一回リセットメールを送ろうとしたら、エラーが発生する', function() {
      try {
        Meteor.call('sendForgotPasswordEmail', 'en', email);
      } catch (Error) {
        chai.expect(Error.error).to.equal('Email already sent');
      }
    });
  });
});
