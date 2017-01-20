import React from 'react';
import i18n from 'meteor/universe:i18n';
import Header from '../../ui/components/Header';
import { Link } from 'react-router';
import { Col } from 'react-bootstrap';
import Loading from 'react-loading';
import { browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
export default class Top extends TrackerReact(React.Component) {
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
          <Header/>
          <div className="top-box">
            <h1>{i18n.getTranslation('top', 'title1')}</h1>
            <h1>{i18n.getTranslation('top', 'title2')}</h1>
            <h3>{i18n.getTranslation('top', 'subTitle')}</h3>
          </div>
          <div className="top-button">
            <Link to="sign-in" className="sign-in button-style top-button-padding">{i18n.getTranslation('top', 'signIn')}</Link>
          </div>
        </div>
      );
    }
  }
}
