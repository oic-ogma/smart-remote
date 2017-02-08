import React from 'react';
import { Col } from 'react-bootstrap';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import PanelGroup from '../components/PanelGroup';
import {ButtonLayout} from '../../api/button_layout/button_layout';
import Slider from '../components/Slider';
import Header from '../components/Header';
import Alert from 'react-s-alert';
import { browserHistory } from 'react-router';
import i18n from 'meteor/universe:i18n';

export default class MyPage extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);
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

  componentDidMount() {
    Meteor.call( "addDataFirstLogin" );
  }

  componentWillUnmount() {
    this.state.subscription.buttonLayout.stop();
    this.state.subscription.buttonLibrary.stop();
  }

  buttonLayout() {
    return ButtonLayout.find({}).fetch();
  }

  render() {
    if (Meteor.user()) {
      i18n.setLocale(Meteor.user().profile.language);
      return (
        <div>
        <Header/>
          <Slider/>
          { this.buttonLayout().map((buttonLayoutSingle) => {
            return (
              <Col sm={6} md={6} key={buttonLayoutSingle._id}>
                <PanelGroup
                  groupId={buttonLayoutSingle.groupId}
                  editMode={this.props.params.editMode}
                  buttonType={this.props.params.buttonType}
                  groupType={buttonLayoutSingle.type}
                  buttonArray={buttonLayoutSingle.buttons}
                  buttonId={this.props.params.buttonId}
                />
              </Col>
            );
          })}
          <Alert stack={{limit: 1}} />
        </div>
      );
    } else {
      return null;
    }
  }
}

MyPage.propTypes = {
  params: React.PropTypes.object,
};
