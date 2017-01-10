import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class PanelSlot extends TrackerReact(React.Component) {
  // getButtonId() {
  //   return ButtonLayout.find(
  //     {
  //       buttons: {
  //         $elemMatch: { buttonId: { $exists: true } }
  //       }
  //     }
  //   ).count();
  // }
  render() {
    // console.log( "object" );
    // console.log( this.props.buttonObject);
    return (
      <div>
        { this.props.registerId }
      </div>
    );
  }
}

PanelSlot.propTypes = {
  id: React.PropTypes.number,
  groupType: React.PropTypes.string,
  registerId: React.PropTypes.string,
  editMode: React.PropTypes.string,
};
