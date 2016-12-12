import i18n from 'meteor/universe:i18n';
import { check } from 'meteor/check';
import { validate } from 'isemail';
import { Accounts } from 'meteor/accounts-base';


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

const sendForgotEmail = (userObject, address) => {
  console.log(address + "にメールが送信された");
  // send email
  Accounts.sendResetPasswordEmail(userObject, address, (err) => {
    if (err) {
      console.log(error.reason);
    } else {
      throw new Meteor.Error( "Email address does not exist." );
    }
  });
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
    if (validate(address)) {
      setServerLocale(language);
      setEmailTemplates();
      SSR.compileTemplate('resetPassword', Assets.getText('emails/' + i18n.getLocale() + '/forgot_password.html'));
      Accounts.emailTemplates.resetPassword = {
        subject() {
          return i18n.getTranslation('emailTemplates.reset_password', 'subject');
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

      const userObject = Meteor.users.findOne({'emails.address': address});
      // this is 5minutes timer
      // block that send Email in succession
      try {
        const tokenDate = userObject.services.password.reset.when;
        const nowTime = moment();
        const timeDifference = nowTime.diff( tokenDate, 'minutes' );
        if (timeDifference >= 5) {
          sendForgotEmail( userObject, address );
        } else {
          console.log("not 5minutes");
        }
      } catch ( e ) {
        sendForgotEmail( userObject, address );
      }
    }
  },
});
