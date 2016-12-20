import React from 'react';
import Slider from '../components/Slider';
import { IRData } from '../../api/IRData/IRData';

export default class AddButtonPanel extends React.Component {
  componentDidMount() {
    Meteor.subscribe('IRData');
  }

  hoge() {
    console.log(IRData.find().fetch());
  }

  render() {
    return (
        <div>
          <Slider/>
          <ul>
            <li><a className="menu-item" href='/my-page/large/1'>電気をつける</a></li>
            <li><a className="menu-item" href='/my-page/small/2'>電気を消す</a></li>
            <li><a className="menu-item" href='/my-page/small/2'>音量UP</a></li>
            <li><a className="menu-item" href='/my-page/small/2'>音量DOWN</a></li>
            <button onClick={ () => this.hoge() }>aaa</button>
          </ul>
        </div>
    );
  }
}

AddButtonPanel.propTypes = {
  size: React.PropTypes.string,
};
