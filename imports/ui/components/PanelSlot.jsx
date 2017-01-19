import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { ButtonLibrary } from '../../api/button_library/button_library';
import { Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';

export default class PanelSlot extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);
  }

  buttonLibrary() {
    if ( !!this.props.buttonObject ) {
      return ButtonLibrary.findOne({_id: this.props.buttonObject.buttonId});
    } else {
      return null;
    }
  }

  addButtonPanel() {
    const params = {
      panelId: this.props.id,
      groupId: this.props.groupId,
      buttonId: this.props.buttonId,
    };

    console.log( "groupId = " + params.groupId );
    console.log( "panelId = " + params.panelId );

    Meteor.call( "addButton", params, ( error ) => {
      if ( error ) {
        Alert.error(i18n.getTranslation('myPage', 'alert.outOfMemory'), {
          position: 'bottom',
          effect: 'genie',
          timeout: 3000,
        });
      }
    } );
    browserHistory.push('/my-page');
  }

  sendIr( buttonObject ) {
    Meteor.call( "sendIr", buttonObject );
  }

  render() {
    if ( this.buttonLibrary() ) {
      return (
      <button className = 'button-style' onClick={() => this.sendIr(this.props.buttonObject)  }>
        { this.buttonLibrary().buttonTitle }
      </button>
      );
    } else if ( this.props.editMode === 'true' ) {
      return (
        <div>
          <button className = 'button-style' onClick={() => this.addButtonPanel() }><Glyphicon glyph='plus'/></button>
          <Alert stack={{limit: 1}} />
        </div>
      );
    } else {
      return null;
    }
  }
}

PanelSlot.propTypes = {
  id: React.PropTypes.number,
  groupType: React.PropTypes.string,
  buttonObject: React.PropTypes.object,
  editMode: React.PropTypes.string,
  groupId: React.PropTypes.number,
  buttonId: React.PropTypes.string,
};
