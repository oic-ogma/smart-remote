import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default class Slider extends React.Component {
  showLeft() {
    this.refs.left.show();
  }

  render() {
    let styles = {
      bmBurgerButton: {
        position: 'relative',
        width: '20px',
        height: '20px',
        left: '0px',
        top: '0px'
      },
      bmBurgerBars: {
        background: '#373a47'
      },
      bmCrossButton: {
        height: '24px',
        width: '24px'
      },
      bmCross: {
        background: '#bdc3c7'
      },
      bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
      },
      bmMorphShape: {
        fill: '#373a47'
      },
      bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
      }
    };

    return (
      <div>
        <Menu ref="left" alignment="left" styles={ styles }>
          <a id="register" className="menu-item" href="/register">登録</a>
          <a id="add-button-panel" className="menu-item" href="/add-button-panel">ボタン追加</a>
          <a id="sign-in" className="menu-item" href="/sign-in">sign-in</a>
          <a id="my-page-small" className="menu-item" href="/my-page-large">マイページ</a>
        </Menu>
      </div>
    );
  }
}
