import React from 'react';
import {Meteor} from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import Header from '../components/Header';
import { Grid, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router';

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
        <Header/>
        <Grid className="center sign-in-center">
        <form onSubmit = {this.handleSubmit.bind(this)}>
          <Row>
            <Col>
              <input
                type="email"
                name="email"
                placeholder={i18n.getTranslation('form', 'email')}
                className="input-style"/>
            </Col>
          </Row>
          <Row>
            <Col>
              <input
                type="password"
                name="password"
                placeholder={i18n.getTranslation('form', 'password')}
                className="input-style"/>
            </Col>
          </Row>
          <Row>
            <Link to="reset-password" className="forgot-password">{i18n.getTranslation('signIn', 'forgotPassword')}</Link>
          </Row>
          <Row>
            <button type="submit" className="button-style">{i18n.getTranslation('form', 'signIn')}</button>
          </Row>
        </form>
        <div className="sign-in-box">
          <span className="sign-in-message">{i18n.getTranslation('signIn', 'needAccount')}</span>
          <Link to="register" className="sign-in-link sign-in-button">{i18n.getTranslation('signIn', 'signUp')}</Link>
        </div>
        </Grid>
      </div>
    );
  }
}
