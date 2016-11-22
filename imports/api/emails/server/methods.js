import i18n from 'meteor/universe:i18n';
import { check } from 'meteor/check';
import { validate } from 'isemail';

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
});
