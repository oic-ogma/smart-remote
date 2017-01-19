import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Slider from '../components/Slider';
import { ButtonLibrary } from '../../api/button_library/button_library';
import { Link } from 'react-router';

export default class AddButtonPanel extends TrackerReact(React.Component) {
  componentDidMount() {
    Meteor.subscribe('buttonLibrary');
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

              return <li><Link to={'/my-page/true/panel/' + urlButtonId}>{irDataSingle.buttonTitle}</Link></li>;
            } ) }
          </ul>
        </div>
    );
  }
}

AddButtonPanel.propTypes = {
  size: React.PropTypes.string,
};
