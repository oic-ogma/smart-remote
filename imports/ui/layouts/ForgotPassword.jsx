import React from 'react';
import { Meteor } from 'meteor/meteor';
import LanguageSelector from '../components/LanguageSelector.jsx';
import i18n from 'meteor/universe:i18n';
import Validation from 'react-validation';
import '../../api/validator/form_validator';

export default class ForgotPassword extends React.Component {
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
    let emailVar = event.target.email.value;
    Meteor.call('sendForgotPasswordEmail', i18n.getLocale(), emailVar, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  render() {
    return (
      <div>
        <LanguageSelector />
          <Validation.components.Form onSubmit={this.handleSubmit.bind(this)}>
            <Validation.components.Input
              id="input-reset-email"
              type="email"
              value=''
              name="email"
              placeholder={i18n.getTranslation('forgotPassword', 'email')}
              validations={['required', 'email']}/>
            <Validation.components.Button>{i18n.getTranslation('forgotPassword', 'reset')}</Validation.components.Button>
            </Validation.components.Form>
      </div>
    );
  }
}
