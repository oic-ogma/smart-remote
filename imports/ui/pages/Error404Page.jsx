import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Grid, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router';

export default class Error404Page extends React.Component {
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
        <Grid className="center error-404-page">
          <Row>
            <Col>
                <span>{i18n.getTranslation('error404Page', 'topMessage')}</span>
                <img src="img/404-dog.jpg" className="error-img" />
                <span>{i18n.getTranslation('error404Page', 'bottomMessage')}</span>
                <Link to="/" className="sign-in-link sign-in-button">{i18n.getTranslation('error404Page', 'topPage')}</Link>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
