import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { ButtonLibrary } from '../../api/button_library/button_library';
import { Link } from 'react-router';

export default class AddButtonPanel extends TrackerReact(React.Component) {
  buttonLibrary() {
    if (ButtonLibrary.find({}).count()) {
      return ButtonLibrary.find({}).fetch();
    } else {
      return null;
    }
  }

  render() {
    if (this.buttonLibrary()) {
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
    } else {
      return (
        <div className='center error-404-page'>
          { i18n.getTranslation('addButton', 'error') }
        </div>
      );
    }
  }
}

AddButtonPanel.propTypes = {
  size: React.PropTypes.string,
};
