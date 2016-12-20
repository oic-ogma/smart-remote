import React from 'react';
import i18n from 'meteor/universe:i18n';
import Header from '../../ui/components/Header';
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

  handleSubmit(event) {
    event.preventDefault();
    location.href = '/sign-in';
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
          <button
            type="button"
            href="sign-in"
            className="button-style"
            onClick={this.handleSubmit.bind(this)}>
              {i18n.getTranslation('top', 'signIn')}
          </button>
        </div>
      </div>
    );
  }
}
