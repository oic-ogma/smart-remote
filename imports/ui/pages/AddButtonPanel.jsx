import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { ButtonLibrary } from '../../api/button_library/button_library';
import { Link } from 'react-router';

export default class AddButtonPanel extends TrackerReact(React.Component) {
  buttonLibrary() {
    return ButtonLibrary.find({}).fetch();
  }

  render() {
    return (
      <div>
        <ul className='add-button-panel-lists'>
          { this.buttonLibrary().map((buttonLibrarySingle) => {
            return (
              <li key={ buttonLibrarySingle._id }>
                <Link to={ '/my-page/add/panel/' + buttonLibrarySingle._id }>
                  { buttonLibrarySingle.buttonTitle }
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

AddButtonPanel.propTypes = {
  size: React.PropTypes.string,
};
