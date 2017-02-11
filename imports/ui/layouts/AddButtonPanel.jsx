import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Slider from '../components/Slider';
import { ButtonLibrary } from '../../api/button_library/button_library';
import { Link } from 'react-router';
import Header from '../components/Header';

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
        <Header/>
          <Slider/>
          <ul className="add-button-panel-lists">
            { this.irData().id }
            { this.irData().map((irDataSingle) => {
              let urlButtonId = irDataSingle._id;

              return <li><Link to={'/my-page/add/panel/' + urlButtonId}>{irDataSingle.buttonTitle}</Link></li>;
            } ) }
          </ul>
        </div>
    );
  }
}

AddButtonPanel.propTypes = {
  size: React.PropTypes.string,
};
