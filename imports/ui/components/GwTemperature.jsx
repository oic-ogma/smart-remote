import React from 'react';
import { Glyphicon } from 'react-bootstrap';

export default class GwTemperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperatureResponse: ''};
  }

  getTemperature() {
    Meteor.call("getTemperature", ( error, result ) => {
      if (error) {
        this.setState({temperatureResponse: "--"});
      } else {
        this.setState({temperatureResponse: result});
      }
    });
  }

  componentDidMount() {
    this.getTemperature();
    Meteor.setInterval(function() {
      this.getTemperature();
    }.bind(this)
  , 10000);
  }

  render() {
    let style = {
      fontSize: 24,
    };
    if (this.state.temperatureResponse) {
      return (
        <div style={style}>
          <Glyphicon glyph = "cloud"/>
          { this.state.temperatureResponse + "℃" }
        </div>
      );
    } else {
      return null;
    }
  }
}
