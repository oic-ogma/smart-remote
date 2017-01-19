import React from 'react';
import { Meteor } from 'meteor/meteor';
import Header from '../components/Header';
import Validation from 'react-validation';
import { Grid, Col } from 'react-bootstrap';
import '../../api/validator/form_validator';
import Alert from 'react-s-alert';
import BackButton from '../components/BackButton';
import Loading from 'react-loading';
import { browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ForgotPassword extends TrackerReact(React.Component) {
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

  formReset() {
    document.getElementById('input-reset-email').value = '';
  }

  handleSubmit(event) {
    event.preventDefault();
    let emailVar = event.target.email.value;
    Meteor.call('sendForgotPasswordEmail', i18n.getLocale(), emailVar, (error) => {
      if (!error) {
        this.formReset();
        Alert.success(i18n.getTranslation('forgotPassword', 'alerts.success'), {
          position: 'bottom',
          effect: 'genie',
          timeout: 3000,
        });
      } else if (error.error === "Email already sent") {
        Alert.error(i18n.getTranslation('forgotPassword', 'alerts.alreadySent'), {
          position: 'bottom',
          effect: 'genie',
          timeout: 3000,
        });
      } else if (error.error === 'Email address not found') {
        Alert.error(i18n.getTranslation('forgotPassword', 'alerts.invalidEmail'), {
          position: 'bottom',
          effect: 'genie',
          timeout: 3000,
        });
      }
    });
  }

  render() {
    if (Meteor.loggingIn()) {
      return (
        <Col xsOffset={4} xs={4} mdOffset={4} md={4}>
          <Loading type='bars' color='rgb(255, 255, 255)' />
        </Col>
      );
    } else if (Meteor.user()) {
      browserHistory.push('/my-page');
      return null;
    } else {
      return (
        <div>
          <Header />
          <Grid className="center forgot-password-center">
            <Validation.components.Form onSubmit={this.handleSubmit.bind(this)}>
              <Validation.components.Input
                id="input-reset-email"
                type="email"
                value=''
                name="email"
                placeholder={i18n.getTranslation('forgotPassword', 'email')}
                validations={['required', 'email']}
                className="input-style"
              />
              <Validation.components.Button className="button-style forgot-password-button">{i18n.getTranslation('forgotPassword', 'reset')}</Validation.components.Button>
            </Validation.components.Form>
          </Grid>
          <BackButton link="sign-in"/>
          <Alert stack={{limit: 1}} />
        </div>
      );
    }
  }
}
