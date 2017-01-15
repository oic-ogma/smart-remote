import React from 'react';
import { Col } from 'react-bootstrap';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import PanelGroup from '../components/PanelGroup';
import {ButtonLayout} from '../../api/ButtonLayout/ButtonLayout';
import Slider from '../components/Slider';

export default class MyPage extends TrackerReact(React.Component) {
  constructor( props ) {
    super(props);
  }

  componentDidMount() {
    Meteor.subscribe('ButtonLayout');
    Meteor.subscribe( 'ButtonLibrary' );
  }

  buttonLayout() {
    return ButtonLayout.find({}).fetch();
  }

  render() {
    return (
        <div>
        <Slider/>
          { this.buttonLayout().map((buttonLayoutSingle) => {
            return (
             <Col md={6}>
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
          } ) }
        </div>
    );
  }
}

MyPage.propTypes = {
  params: React.PropTypes.object,
};
