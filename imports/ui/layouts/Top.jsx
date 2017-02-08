import React from 'react';
import i18n from 'meteor/universe:i18n';
import Header from '../../ui/components/Header';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
export default class Top extends TrackerReact(React.Component) {
  constructor() {
    super(...arguments);
    this.state = {
      isAuthenticated: Meteor.userId() !== null,
      locale: i18n.getLocale(),
    };
    this.onLocale = this.onLocale.bind(this);
  }

  onLocale(locale) {
    this.setState({locale});
  }

  componentWillMount() {
    if (this.state.isAuthenticated) {
      browserHistory.push('/my-page');
    }
    i18n.onChangeLocale(this.onLocale);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.onLocale);
  }

  render() {
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
