import React from 'react';
import Slider from '../components/Slider';

export default class AddButtonPanel extends React.Component {

  render() {
    return (
        <div>
          <Slider/>
          <ul>
            <li><a id="my-page-large" className="menu-item" href="/my-page-large">MORIMOTO</a></li>
            <li><a id="my-page-small" className="menu-item" href="/my-page-small">morimoto</a></li>
          </ul>
        </div>
    );
  }
}
