import i18n from 'meteor/universe:i18n';
import { check } from 'meteor/check';
import { validate } from 'isemail';
import { Accounts } from 'meteor/accounts-base';
import moment from "moment";

const setServerLocale = (language) => {
  if (language !== 'ja') {
    i18n.setLocale('en');
  } else {
    i18n.setLocale(language);
  }
};

const setEmailTemplates = () => {
  Accounts.emailTemplates.siteName = i18n.getTranslation('emailTemplates', 'siteName');
  Accounts.emailTemplates.from = i18n.getTranslation('emailTemplates', 'from');
  Accounts.emailTemplates.subject = i18n.getTranslation('emailTemplates.enrollAccount', 'subject');
};

const canSendResetPasswordEmail = (userObject) => {
  if (userObject) {
    if (!!userObject.services.password.reset) {
      const tokenDate = userObject.services.password.reset.when;
      const currentTime = moment();
      const timeDifference = currentTime.diff( tokenDate, 'minutes' );
      if (timeDifference >= 5) {
        return true;
      } else {
        throw new Meteor.Error('Email already sent');
      }
    } else {
      return true;
    }
  } else {
    throw new Meteor.Error('Email address not found');
  }
};

Meteor.methods({
  sendEnrollmentEmail: (language, address) => {
    check(language, String);
    if (validate(address)) {
      setServerLocale(language);
      setEmailTemplates();
      SSR.compileTemplate('enrollment', Assets.getText('emails/' + i18n.getLocale() + '/enrollment.html'));
      Accounts.emailTemplates.enrollAccount = {
        subject() {
          return i18n.getTranslation('emailTemplates.enrollAccount', 'subject');
        },
        html( user, url ) {
          let emailData = {};
          emailData.address = user.emails[0].address;
          emailData.urlWithoutHash = url.replace( '#/', '' ) + '/' + language;
          emailData.supportEmail = "support@smart-remote.tech";
          let html  = SSR.render('enrollment', emailData);
          return html;
        },
      };

      let userObject = Accounts.createUser({
        email: address,
      });
      if (userObject) {
        Accounts.sendEnrollmentEmail(userObject);
        console.log(address + "にメールが送信された");
        return userObject;
      } else {
        throw new Meteor.Error('Failed to send.');
      }
    } else {
      throw new Meteor.Error('Invalid parameters.');
    }
  },

  sendForgotPasswordEmail: (language, address) => {
    check(language, String);
    check(address, String);
    const userObject = Meteor.users.findOne({'emails.address': address});
    const canSend = canSendResetPasswordEmail(userObject);
    if (canSend) {
      setServerLocale(language);
      setEmailTemplates();
      SSR.compileTemplate('resetPassword', Assets.getText('emails/' + i18n.getLocale() + '/forgot_password.html'));
      Accounts.emailTemplates.resetPassword = {
        subject() {
          return i18n.getTranslation('emailTemplates.resetPassword', 'subject');
        },
        html( user, url ) {
          let emailData = {};
          emailData.address = user.emails[0].address;
          emailData.urlWithoutHash = url.replace( '#/', '' ) + '/' + language;
          emailData.supportEmail = "support@smart-remote.tech";
          let html  = SSR.render('resetPassword', emailData);
          return html;
        },
      };

      Accounts.sendResetPasswordEmail(userObject, address, (err) => {
        if (err) {
          throw new Meteor.Error(error.reason);
        } else {
          console.log(address + "にパスワードリセットメールが送信された");
        }
      });
    } else {
      throw canSend;
    }
  },
});
