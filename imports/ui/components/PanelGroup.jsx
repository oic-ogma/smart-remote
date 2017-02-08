import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Glyphicon, Col } from 'react-bootstrap';
import PanelSlot from './PanelSlot';

export default class PanelGroup extends TrackerReact(React.Component) {
  constructor( props ) {
    super(props);
  }

  render() {
    if (
      this.props.mode === 'add'
      && (this.props.buttonType === 'widget' || this.props.buttonType === 'graph-widget')
      && this.props.groupType === null
    ) {
      return (
        <div>
          <Glyphicon glyph='plus'/>
        </div>
      );
    } else if ( this.props.groupType === 'button-widget' ) {
      const buttonStyle = {
        height: '15vh',
        width: '85%',
      };
      return (
        <div>
          <Col><button style={buttonStyle} className = 'button-style'>widget</button></Col>
        </div>
      );
    } else {
      return (
        <div>
          <Col smOffset={1} mdOffset={1} sm={5} md={5}>
            <PanelSlot
              groupId={this.props.groupId}
              id={0}
              mode={this.props.mode}
              buttonType={this.props.buttonType}
              buttonObject={this.props.buttonArray[0]}
              buttonId={ this.props.buttonId } />
          </Col>

          <Col sm={5} md={5}>
            <PanelSlot
              groupId={this.props.groupId}
              id={1}
              mode={this.props.mode}
              buttonType={this.props.buttonType}
              buttonObject={this.props.buttonArray[1]}
              buttonId={ this.props.buttonId } />
          </Col>

          <Col smOffset={1} mdOffset={1} sm={5} md={5}>
            <PanelSlot
            groupId={this.props.groupId}
            id={2}
            mode={this.props.mode}
            buttonType={this.props.buttonType}
            buttonObject={this.props.buttonArray[2]}
            buttonId={ this.props.buttonId } />
          </Col>

          <Col sm={5} md={5}>
            <PanelSlot
            groupId={this.props.groupId}
            id={3}
            mode={this.props.mode}
            buttonType={this.props.buttonType}
            buttonObject={this.props.buttonArray[3]}
            buttonId={ this.props.buttonId } />
          </Col>
        </div>
      );
    }
  }
}

PanelGroup.propTypes = {
  params: React.PropTypes.object,
  groupId: React.PropTypes.number,
  groupType: React.PropTypes.string,
  buttonArray: React.PropTypes.array,
  mode: React.PropTypes.string,
  buttonId: React.PropTypes.string,
};
