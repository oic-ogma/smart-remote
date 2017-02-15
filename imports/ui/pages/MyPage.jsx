import React from 'react';
import { Col } from 'react-bootstrap';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import PanelGroup from '../components/PanelGroup';
import { ButtonLayout } from '../../api/button_layout/button_layout';

export default class MyPage extends TrackerReact(React.Component) {
  componentDidMount() {
    Meteor.call('addDataFirstLogin');
  }

  buttonLayout() {
    return ButtonLayout.find({}).fetch();
  }

  render() {
    return (
      <div>
        { this.buttonLayout().map((buttonLayoutSingle) => {
          return (
            <Col sm={ 6 } md={ 6 } key={ buttonLayoutSingle._id }>
              <PanelGroup
                groupId={ buttonLayoutSingle.groupId }
                mode={ this.props.params.mode }
                buttonType={ this.props.params.buttonType }
                groupType={ buttonLayoutSingle.type }
                buttonArray={ buttonLayoutSingle.buttons }
                buttonId={ this.props.params.buttonId }
              />
            </Col>
          );
        })}
      </div>
    );
  }
}

MyPage.propTypes = {
  params: React.PropTypes.object,
};
