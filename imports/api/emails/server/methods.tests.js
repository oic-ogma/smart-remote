import './methods.js';
import { chai } from 'meteor/practicalmeteor:chai';
import i18n from 'meteor/universe:i18n';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import faker from 'faker';

describe('メール', function() {
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
