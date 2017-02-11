import React from 'react';
import i18n from 'meteor/universe:i18n';
import Header from '../../ui/components/Header';
import { browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

export default class LoggedOut extends TrackerReact(React.Component) {
  constructor() {
    super(...arguments);
    this.state = {
      isAuthenticated: Meteor.userId() !== null,
      locale: i18n.getLocale(),
    };
    this.onLocale = this.onLocale.bind(this);
  }

  onLocale(locale) {
    this.setState({ locale });
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
    const childrenWithProps = React.cloneElement(this.props.children, this.props);
    return (
      <div>
        <Header/>
        {childrenWithProps}
        <Alert stack={ { limit: 1 } } />
      </div>
    );
  }
}
