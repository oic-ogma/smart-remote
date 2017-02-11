import React from 'react';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import { Grid, Col, Row } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import BackButton from '../components/BackButton';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class SignIn extends TrackerReact(React.Component) {
  handleSubmit(event) {
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.password.value;
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        Alert.error(i18n.getTranslation('alert', 'error.signIn'), {
          position: 'bottom',
          effect: 'genie',
          timeout: 3000,
        });
      } else {
        browserHistory.push('/my-page');
      }
    });
  }

  render() {
    return (
      <div>
        <Grid className='center sign-in-center'>
          <form onSubmit={ this.handleSubmit.bind(this) }>
            <Row>
              <Col>
                <input
                  type='email'
                  name='email'
                  placeholder={ i18n.getTranslation('form', 'email') }
                  className='input-style'/>
              </Col>
            </Row>
            <Row>
              <Col>
                <input
                  type='password'
                  name='password'
                  placeholder={ i18n.getTranslation('form', 'password') }
                  className='input-style'/>
              </Col>
            </Row>
            <Row>
              <Link to='forgot-password' className='forgot-password'>{ i18n.getTranslation('signIn', 'forgotPassword') }</Link>
            </Row>
            <Row>
              <button type='submit' className='button-style'>{ i18n.getTranslation('form', 'signIn') }</button>
            </Row>
          </form>
          <div className='sign-in-box'>
            <span className='sign-in-message'>{ i18n.getTranslation('signIn', 'needAccount') }</span>
            <Link to='register' className='sign-in-link sign-in-button'>{ i18n.getTranslation('signIn', 'signUp') }</Link>
          </div>
        </Grid>
        <BackButton link='/'/>
      </div>
    );
  }
}
