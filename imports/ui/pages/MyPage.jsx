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

  buttonCount() {
    return ButtonLayout.find({ 'buttons': { $elemMatch: { $ne: null } } }).count();
  }

  render() {
    if (this.buttonCount() || this.props.params.mode === 'add') {
      return (
        <div className='mypage'>
          { this.buttonLayout().map((buttonLayoutSingle) => {
            return (
              <PanelGroup
                key={ buttonLayoutSingle._id }
                groupId={ buttonLayoutSingle.groupId }
                mode={ this.props.params.mode }
                buttonType={ this.props.params.buttonType }
                groupType={ buttonLayoutSingle.type }
                buttonArray={ buttonLayoutSingle.buttons }
                buttonId={ this.props.params.buttonId }
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <div className='center warning'>
          { i18n.getTranslation('myPage', 'noButtonsAdded') }
        </div>
      );
    }
  }
}

MyPage.propTypes = {
  params: React.PropTypes.object,
};
