import React from 'react';
import { countryList } from './country_list/country_list';
import { getLanguage } from '../../startup/client/language';

export default class CountrySelector extends React.Component {
  render() {
    let style = {
      selector: {
        color: '#fff',
        border: 'none',
        borderRadius: 'initial',
        borderBottom: '1px solid #fff',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        padding: '5px',
        marginTop: '36px',
        width: '250px',
      },
      option: {
        color: '#000',
      },
    };
    let options = [];
    let countryListCurrentLang = countryList[getLanguage()];
    for (let countryCode in countryListCurrentLang) {
      if (countryListCurrentLang.hasOwnProperty(countryCode)) {
        options.push(
          <option style={ style.option } key={ countryCode } value={ countryCode }>
            { countryListCurrentLang[countryCode] }
          </option>
        );
      }
    }
    return (
      <div className='country-drop-down'>
        <select name='country' style={ style.selector }>
          { options }
        </select>
      </div>
    );
  }
}
