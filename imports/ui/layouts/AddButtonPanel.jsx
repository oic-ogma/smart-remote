import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Slider from '../components/Slider';
import { ButtonLibrary } from '../../api/ButtonLibrary/ButtonLibrary';

export default class AddButtonPanel extends TrackerReact(React.Component) {
  componentDidMount() {
    Meteor.subscribe('ButtonLibrary');
  }

  irData() {
    Meteor.subscribe('ButtonLibrary');
    let data = ButtonLibrary.find({}).fetch();
    return data;
  }

  render() {
    return (
        <div>
          <Slider/>
          <ul>
            { this.irData().id }
            { this.irData().map((irDataSingle) => {
              let urlId = irDataSingle.id;
              let urlButtonType = irDataSingle.buttonType;
              let urlIrId = irDataSingle.irID;

              return <li><a href={'/my-page/' + urlId + '/' + urlButtonType + '/' + urlIrId}>{irDataSingle.buttonName}</a></li>;
            } ) }
          </ul>
        </div>
    );
  }
}

AddButtonPanel.propTypes = {
  size: React.PropTypes.string,
};
