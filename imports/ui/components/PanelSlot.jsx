import React from 'react';

export default class PanelSlot extends React.Component {
  sendIndex() {
    console.log("Buttonが押されました");
  }

  render() {
    return (
      <div>
        {this.sendIndex()}
      </div>
    );
  }
}
