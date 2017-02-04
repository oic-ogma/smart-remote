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

  buttonLibrary() {
    return ButtonLibrary.find({}).fetch();
  }

  render() {
    return (
        <div>
        <Header/>
          <Slider/>
          <ul>
            { this.buttonLibrary().map((buttonLibrarySingle) => {
              return <li key={buttonLibrarySingle._id}>
                        <Link to={'/my-page/true/panel/' + buttonLibrarySingle._id}>
                          {buttonLibrarySingle.buttonTitle}
                        </Link>
                     </li>;
            } ) }
          </ul>
        </div>
    );
  }
}

AddButtonPanel.propTypes = {
  size: React.PropTypes.string,
};
