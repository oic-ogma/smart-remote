import React from 'react';
import Slider from '../components/Slider';
import MyPageLarge from './MyPageLarge.jsx';
import MyPageSmall from './MyPageSmall.jsx';

export default class AddButtonPanel extends React.Component {

  hoge() {
    if (this.props.size === "lage") {
      return <MyPageLarge/>;
    } else {
      return <MyPageSmall/>;
    }
  }

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

AddButtonPanel.propTypes = {
  size: React.PropTypes.string,
};
