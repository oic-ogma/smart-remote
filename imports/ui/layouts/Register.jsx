import React from 'react';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import LanguageSelector from '../components/LanguageSelector';
import Validation from 'react-validation';
import '../../api/validator/form_validator';

export default class Register extends React.Component {
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
    let emailVar = event.target.registerEmail.value;
    let confirmEmailVar = event.target.confirmEmail.value;
    if (emailVar === confirmEmailVar) {
      Meteor.call('sendEnrollmentEmail', i18n.getLocale(), emailVar, (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
  }

  render() {
    return (
      <div>
        <LanguageSelector/>
        <Validation.components.Form onSubmit={this.handleSubmit.bind(this)}>
          <Validation.components.Input
            id="input-email"
            type="email"
            value=''
            name="registerEmail"
            placeholder={i18n.getTranslation('form', 'email')}
            validations={['required', 'email']}/>
          <Validation.components.Input
            id="input-confirm-email"
            type="email"
            value=''
            name="confirmEmail"
            placeholder={i18n.getTranslation('form', 'confirmEmail')}
            validations={['confirmEmail']}/>
          <Validation.components.Button>{i18n.getTranslation('form', 'registerBtn')}</Validation.components.Button>
        </Validation.components.Form>
        <IrTest/>
      </div>
    );
  }
}
