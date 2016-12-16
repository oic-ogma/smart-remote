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
            <button type="submit">morimoto1</button>
            <li>morimoto</li>
            <li>morimoto</li>
            <li>morimoto</li>
            <li>morimoto</li>
            <li>morimoto</li>
            <li>morimoto</li>
            <li>morimoto</li>
          </ul>
        </div>
    );
  }
}

AddButtonPanel.propTypes = {
  size: React.PropTypes.string,
};
