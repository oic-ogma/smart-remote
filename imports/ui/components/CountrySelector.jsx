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
    return (
      <div>
      <CountryDropdown
      value={country}
      name="country"
      valueType="short"
      onChange={(val) => this.selectCountry(val)} />
      <RegionDropdown
      value={region}
      name="city"
      countryValueType="short"
      country={country}
      onChange={(val) => this.selectRegion(val)} />
      </div>
    );
  }
}
