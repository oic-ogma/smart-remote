import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class PanelSlot extends TrackerReact(React.Component) {
  // getButtonName() {
  //   return ButtonLibrary.find(
  //     {
  //       buttons: {
  //         $elemMatch: { _id: { this.props.buttonObject } }
  //       }
  //     }
  //   ).count();
  // }
  render() {
    return (
      <div>
        { this.props.buttonObject }
      </div>
    );
  }
}

PanelSlot.propTypes = {
  id: React.PropTypes.number,
  groupType: React.PropTypes.string,
  buttonObject: React.PropTypes.string,
  editMode: React.PropTypes.string,
};
