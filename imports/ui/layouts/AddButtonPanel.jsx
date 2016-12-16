import React from 'react';
import Slider from '../components/Slider';

export default class AddButtonPanel extends React.Component {
  render() {
    return (
        <div>
          <Slider/>
          <ul>
            <li><a className="menu-item" href='/my-page/large'>large</a></li>
            <li><a className="menu-item" href="/my-page/small">small</a></li>
          </ul>
        </div>
    );
  }
}

AddButtonPanel.propTypes = {
  size: React.PropTypes.string,
};
