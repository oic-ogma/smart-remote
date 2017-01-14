import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router';
import Radium from 'radium';

const RadiumLink = Radium(Link);

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
        top: '0px',
      },
      bmBurgerBars: {
        background: '#373a47',
      },
      bmCrossButton: {
        height: '24px',
        width: '24px',
      },
      bmCross: {
        background: '#bdc3c7',
      },
      bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em',
      },
      bmMorphShape: {
        fill: '#373a47',
      },
      bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em',
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)',
      }
    };

    return (
      <div>
        <Menu ref="left" alignment="left" styles={ styles }>
          <RadiumLink id="button-register" className="menu-item" to="/button-register">登録</RadiumLink>
          <RadiumLink id="add-button-panel" className="menu-item" to="/add-button-panel">ボタン追加</RadiumLink>
          <RadiumLink id="sign-in" className="menu-item" to="/sign-in">sign-in</RadiumLink>
        </Menu>
      </div>
    );
  }
}
