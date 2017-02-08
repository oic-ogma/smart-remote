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
    let panelStyle = {
      parent: {
        width: "100%",
        height: "100%"
      },
      child: {
        width: "96%",
        height: "100%",
        backgroundColor: "#D04255",
        borderStyle: "none"
      },
      childEdit: {
        width: "96%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0)",
        borderStyle: "none"
      },
      childNull: {
        width: "96%",
        height: "100%",
        borderStyle: "none"
      }
    };
    if ( this.buttonLibrary() ) {
      return (
      <div style={panelStyle.parent}>
        <button style={panelStyle.child} onClick={() => this.sendIr(this.props.buttonObject)  }>
          { this.buttonLibrary().buttonTitle }
        </button>
      </div>
      );
    } else if ( this.props.editMode === 'true' ) {
      return (
        <div style={panelStyle.parent}>
          <button style={panelStyle.childEdit} onClick={() => this.addButtonPanel() }><Glyphicon glyph='plus'/></button>
          <Alert stack={{limit: 1}} />
        </div>
      );
    } else {
      return (
        <div style={panelStyle.parent}>
          <div style={panelStyle.childNull}></div>
        </div>
      );
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
