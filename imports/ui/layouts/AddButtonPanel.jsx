import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { MenuItem } from 'react-bootstrap';

export default class AddButtonPanel extends React.Component {
  showLeft() {
    this.refs.left.show();
  }

  render() {
    return (
      <div>
        <button onClick={this.showLeft}>Show Left Menu!</button>

        <Menu ref="left" alignment="left">
          <MenuItem hash="first-page">First Page</MenuItem>
          <MenuItem hash="second-page">Second Page</MenuItem>
          <MenuItem hash="third-page">Third Page</MenuItem>
        </Menu>
      </div>
    );
  }
}
