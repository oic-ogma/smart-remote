import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { ButtonLibrary } from '../../api/ButtonLibrary/ButtonLibrary';
import { Mongo } from 'meteor/mongo';
import { Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';

export default class PanelSlot extends TrackerReact(React.Component) {
  buttonLibrary() {
    if ( this.props.buttonObject !== "null" ) {
      return ButtonLibrary.findOne({_id: new Mongo.ObjectID(this.props.buttonObject)});
    } else {
      return null;
    }
  }

  addButtonPanel() {
    Meteor.call( "addButton", this.props.id, this.props.groupId, this.props.buttonId );
    browserHistory.push('/my-page');
  }

  render() {
    if ( this.buttonLibrary() ) {
      return (
      <button className = 'button-style'>
        { this.buttonLibrary().buttonName }
      </button>

      );
    } else if ( this.props.editMode === 'true' ) {
      return (<button className = 'button-style' onClick={() => this.addButtonPanel() }><Glyphicon glyph='plus'/></button>);
    } else {
      return null;
    }
  }
}


PanelSlot.propTypes = {
  id: React.PropTypes.number,
  groupType: React.PropTypes.string,
  buttonObject: React.PropTypes.string,
  editMode: React.PropTypes.string,
  groupId: React.PropTypes.number,
  buttonId: React.PropTypes.string,
};
