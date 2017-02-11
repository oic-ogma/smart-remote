import React from 'react';
import i18n from 'meteor/universe:i18n';
import Header from '../../ui/components/Header';
import { browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Slider from '../components/Slider';
import { Col } from 'react-bootstrap';
import Loading from 'react-loading';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

export default class LoggedIn extends TrackerReact(React.Component) {
  constructor() {
    super(...arguments);
    this.state = {
      isAuthenticated: Meteor.userId() !== null,
      subscription: {
        buttonLayout: Meteor.subscribe('buttonLayout'),
        buttonLibrary: Meteor.subscribe('buttonLibrary'),
      },
    };
  }

  componentWillMount() {
    if (!this.state.isAuthenticated) {
      browserHistory.push('/sign-in');
    }
  }

  componentWillUnmount() {
    this.state.subscription.buttonLayout.stop();
    this.state.subscription.buttonLibrary.stop();
  }

  render() {
    if (Meteor.user()) {
      i18n.setLocale(Meteor.user().profile.language);
      return (
        <div>
          <Header/>
          <Slider/>
          {this.props.children}
          <Alert stack={{limit: 1}} />
        </div>
      );
    } else {
      return (
        <Col xsOffset={4} xs={4} mdOffset={4} md={4}>
          <Loading type='bars' color='rgb(255, 255, 255)' />
        </Col>
      );
    }
  }
}
