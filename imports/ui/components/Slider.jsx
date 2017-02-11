import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router';
import Radium from 'radium';
import { browserHistory } from 'react-router';

const RadiumLink = Radium(Link);

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    Meteor.logout((err)=> {
      if (!err) {
        browserHistory.push('/sign-in');
      }
    });
  }

  render() {
    let styles = {
      bmBurgerButton: {
        position: 'relative',
        width: '20px',
        height: '20px',
        left: '25px',
        top: '-39px',
      },
      bmBurgerBars: {
        background: '#fff',
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
      },
    };

    return (
      <div>
        <Menu styles={ styles } onStateChange={ this.isMenuOpen } isOpen={ false }>
          <RadiumLink id='button-register'  className='slider-font' style={ { textDecoration: 'none' } } to='/my-page/button-register'>
            { i18n.getTranslation('slider', 'registerButton') }
          </RadiumLink>

          <RadiumLink id='add-button-panel' className='slider-font' style={ { textDecoration: 'none' } } to='/my-page/add-button-panel'>
            { i18n.getTranslation('slider', 'addButton') }
          </RadiumLink>

          <RadiumLink id='add-smart-retemo' className='slider-font' style={ { textDecoration: 'none' } } to='/my-page/add-smart-remote'>
            { i18n.getTranslation('slider', 'addSmartRemote') }
          </RadiumLink>
          <button className='slider-font' onClick={ this.logout }>{ i18n.getTranslation('slider', 'signOut') }</button>
        </Menu>
      </div>
    );
  }
}
