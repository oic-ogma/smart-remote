import React from 'react';
import {Meteor} from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import LanguageSelector from '../components/LanguageSelector';

export default class SignIn extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      locale: i18n.getLocale(),
    };
    this.onLocale = this.onLocale.bind(this);
  }

  onLocale(locale) {
    this.setState({locale});
  }

  componentWillMount() {
    i18n.onChangeLocale(this.onLocale);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.onLocale);
  }

  handleSubmit(event) {
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.password.value;
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.log("sign in failed");
      } else {
        console.log("success!");
        // TODO 遷移先を記述
      }
    });
  }

  render() {
    return (
      <div>
      <LanguageSelector/>
      <form onSubmit = {this.handleSubmit.bind(this)}>
        <input type="email" name="email" placeholder={i18n.getTranslation('form', 'email')} />
        <input type="password" name="password" placeholder={i18n.getTranslation('form', 'password')} />
        <a href="reset-password">{i18n.getTranslation('signIn', 'forgotPassword')}</a>
        <button type="submit">{i18n.getTranslation('form', 'signIn')}</button>
      </form>
      <span>{i18n.getTranslation('signIn', 'needAccount')}</span>
      <a href="register">{i18n.getTranslation('signIn', 'signUp')}</a>
      </div>
    );
  }
}
