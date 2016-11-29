import React from 'react';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import LanguageSelector from '../components/LanguageSelector.jsx';
import Validation from 'react-validation';
import '../../api/validator/form_validator';
import {FormGroup, Col} from 'react-bootstrap';

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
          <FormGroup role="form">
          <Col mdOffset={4} md={4} xs={4}>
          <Validation.components.Input id="input-email" type="email" value='' name="registerEmail" placeholder={i18n.getTranslation('register', 'email')} validations={['required', 'email']}/>
          <Validation.components.Input id="input-confirm-email" type="email" value='' name="confirmEmail" placeholder={i18n.getTranslation('register', 'confirmEmail')} validations={['confirmEmail']}/>
          </Col>
          <Col mdOffset={5} md={2} xs={4}>
          <Validation.components.Button>{i18n.getTranslation('register', 'register')}</Validation.components.Button>
          </Col>
          </FormGroup>
        </Validation.components.Form>
      </div>
    );
  }
}
