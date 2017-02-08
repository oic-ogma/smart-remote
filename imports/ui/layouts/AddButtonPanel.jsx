import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Slider from '../components/Slider';
import { ButtonLibrary } from '../../api/button_library/button_library';
import { Link } from 'react-router';
import Header from '../components/Header';

export default class AddButtonPanel extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: Meteor.userId() !== null,
      subscription: {
        buttonLibrary: Meteor.subscribe( 'buttonLibrary' ),
      },
    };
  }

  componentWillMount() {
    if (!this.state.isAuthenticated) {
      browserHistory.push('/sign-in');
    }
  }

  componentWillUnmount() {
    this.state.subscription.buttonLibrary.stop();
  }

  buttonLibrary() {
    return ButtonLibrary.find({}).fetch();
  }

  render() {
    if (Meteor.user()) {
      return (
        <div>
        <Header/>
          <Slider/>
          <ul>
            { this.buttonLibrary().map((buttonLibrarySingle) => {
              return (
                <li key={buttonLibrarySingle._id}>
                  <Link to={'/my-page/true/panel/' + buttonLibrarySingle._id}>
                    {buttonLibrarySingle.buttonTitle}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

AddButtonPanel.propTypes = {
  size: React.PropTypes.string,
};
