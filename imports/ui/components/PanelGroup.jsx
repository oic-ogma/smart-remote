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
      this.props.editMode === 'true'
      && (this.props.buttonType === 'widget' || this.props.buttonType === 'graph-widget')
      && this.props.groupType === null
    ) {
      return (
        <div>
          <Glyphicon glyph='plus'/>
        </div>
      );
    } else if ( this.props.groupType === 'button-widget' ) {
      return (
        <div>
          hoge
        </div>
      );
    } else {
      return (
        <div>
          <Col mdOffset={1} md={5}>
            <PanelSlot
              groupId={this.props.groupId}
              id={0}
              editMode={this.props.editMode}
              buttonType={this.props.buttonType}
              buttonObject={this.props.buttonArray[0]}
              buttonId={ this.props.buttonId } />
          </Col>

          <Col md={5}>
            <PanelSlot
              groupId={this.props.groupId}
              id={1}
              editMode={this.props.editMode}
              buttonType={this.props.buttonType}
              buttonObject={this.props.buttonArray[1]}
              buttonId={ this.props.buttonId } />
          </Col>

          <Col mdOffset={1} md={5}>
            <PanelSlot
            groupId={this.props.groupId}
            id={2}
            editMode={this.props.editMode}
            buttonType={this.props.buttonType}
            buttonObject={this.props.buttonArray[2]}
            buttonId={ this.props.buttonId } />
          </Col>

          <Col md={5}>
            <PanelSlot
            groupId={this.props.groupId}
            id={3}
            editMode={this.props.editMode}
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
  editMode: React.PropTypes.string,
  buttonId: React.PropTypes.object,
};
