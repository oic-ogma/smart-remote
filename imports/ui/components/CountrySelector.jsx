import React from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export default class CountrySelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = { country: '', region: '' };
  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }

  render() {
    const { country, region } = this.state;
    let style = {
      selector: {
        color: "#fff",
        border: "none",
        borderRadius: "initial",
        borderBottom: "1px solid #fff",
        backgroundColor: "rgba(0, 0, 0, 0)",
        padding: "5px",
        marginTop: "36px",
        width: "250px"
      }
    };
    return (
      <div className="country-drop-down">
      <div style={style.selector}>
        <CountryDropdown
          value={country}
          name="country"
          valueType="short"
          onChange={(val) => this.selectCountry(val)} />
      </div>
      <div style={style.selector}>
        <RegionDropdown
          value={region}
          name="city"
          countryValueType="short"
          country={country}
          onChange={(val) => this.selectRegion(val)} />
      </div>
      </div>
    );
  }
}
