import React from 'react';
import i18n from 'meteor/universe:i18n';
import Header from '../../ui/components/Header';
import { Link } from 'react-router';
export default class Top extends React.Component {
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
    return (
      <div>
        <Header/>
        <div className="top-box">
          <h1>{i18n.getTranslation('top', 'title1')}</h1>
          <h1>{i18n.getTranslation('top', 'title2')}</h1>
          <h3>{i18n.getTranslation('top', 'subTitle')}</h3>
        </div>
        <div className="top-button">
          <Link to="sign-in" className="button-style top-button-padding">{i18n.getTranslation('top', 'signIn')}</Link>
        </div>
      </div>
    );
  }
}
