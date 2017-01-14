import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Slider from '../components/Slider';
import { ButtonLibrary } from '../../api/ButtonLibrary/ButtonLibrary';

export default class AddButtonPanel extends TrackerReact(React.Component) {
  componentDidMount() {
    Meteor.subscribe('ButtonLibrary');
  }

  irData() {
    return ButtonLibrary.find({}).fetch();
  }

  render() {
    return (
        <div>
          <Slider/>
          <ul>
            { this.irData().id }
            { this.irData().map((irDataSingle) => {
              let urlButtonId = irDataSingle._id;

              return <li><a href={'/my-page/true/panel/' + urlButtonId}>{irDataSingle.buttonName}</a></li>;
            } ) }
          </ul>
        </div>
    );
  }
}

AddButtonPanel.propTypes = {
  size: React.PropTypes.string,
};
