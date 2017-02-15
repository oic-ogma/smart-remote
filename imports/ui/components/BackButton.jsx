import React from 'react';
import { Link } from 'react-router';

export default class BackButton extends React.Component {
  render() {
    const style = {
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      color: '#fff',
    };
    return (
      <Link to={ this.props.link } style={ style }>
        <i className='glyphicon glyphicon-menu-left' style={ { fontSize: '21px' } }></i>
      </Link>
    );
  }
}

BackButton.propTypes = {
  link: React.PropTypes.string.isRequired,
};
