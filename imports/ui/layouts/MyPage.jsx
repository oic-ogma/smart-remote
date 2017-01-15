import React from 'react';
import { Col } from 'react-bootstrap';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import PanelGroup from '../components/PanelGroup';
import {ButtonLayout} from '../../api/button_layout/button_layout';
import Slider from '../components/Slider';
import Alert from 'react-s-alert';
import Loading from 'react-loading';
import { browserHistory } from 'react-router';

export default class MyPage extends TrackerReact(React.Component) {
  constructor( props ) {
    super(props);
  }

  componentDidMount() {
    Meteor.subscribe('buttonLayout');
    Meteor.subscribe( 'buttonLibrary' );
  }

  buttonLayout() {
    return ButtonLayout.find({}).fetch();
  }

  render() {
    if (Meteor.loggingIn()) {
      return (
        <Col xsOffset={4} xs={4} mdOffset={4} md={4}>
          <Loading type='bars' color='rgb(255, 255, 255)' />
        </Col>
      );
    } else if (Meteor.user()) {
      i18n.setLocale(Meteor.user().profile.language);
      return (
        <div>
          <Slider/>
          { this.buttonLayout().map((buttonLayoutSingle) => {
            return (
              <Col sm={6} md={6}>
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
      browserHistory.push('/sign-in');
      return null;
    }
  }
}

MyPage.propTypes = {
  params: React.PropTypes.object,
};
