import React from 'react';
import i18n from 'meteor/universe:i18n';
import LanguageSelector from '../components/LanguageSelector';
import Validation from 'react-validation';
import '../../api/validator/form_validator';
import {FormGroup, Col} from 'react-bootstrap';

export default class EnrollAccount extends React.Component {
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
    i18n.setLocale(FlowRouter.getParam("language"));
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.onLocale);
  }

  handleSubmit(event) {
    event.preventDefault();
    const params = {
      country: event.target.country.value,
      city: event.target.city.value,
    };
    Accounts.resetPassword(FlowRouter.getParam("token"), event.target.password.value, (error) => {
      if (error) {
        console.log(error);
      } else {
        Meteor.call('addEnrollmentInfo', params);
      }
    });
  }
  render() {
    return (
      <div>
      <LanguageSelector/>
      <Validation.components.Form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup role="form">
        <h3>Registration</h3>
          <Col mdOffset={4} md={4} xs={4}>
            <Validation.components.Input id='input-password' type='password' value='' name='password' placeholder={i18n.getTranslation('enrollAccount', 'password')} validations={['required', 'password']}/>
            <Validation.components.Input id='input-confirm-password' type='password' value='' name='confirmPassword' placeholder={i18n.getTranslation('enrollAccount', 'confirmPassword')} validations={['required', 'confirmPassword']}/>
            <Validation.components.Select id='select-country' name='country' value='' validations={['required']}>
              <option value="">{i18n.getTranslation('enrollAccount', 'country')}</option>
              <option value="JP">日本</option>
              <option value="US">United States of America</option>
            </Validation.components.Select>
            <Validation.components.Input id='input-city' name="city" value='' placeholder={i18n.getTranslation('enrollAccount', 'city')} validations={['required']}/>
            <Validation.components.Button>Submit</Validation.components.Button>
          </Col>
        </FormGroup>
      </Validation.components.Form>
      </div>
    );
  }
}
