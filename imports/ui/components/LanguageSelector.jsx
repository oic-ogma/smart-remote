import React from 'react';
import i18n from 'meteor/universe:i18n';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class LanguageSelector extends React.Component {
  setLocaleLanguage(language) {
    if ( language === "ja" ) {
      i18n.setLocale( "ja" );
    } else {
      i18n.setLocale( "en" );
    }
  }

  getLanguage() {
    const bufferLang = i18n.getLanguageName();
    let lang = "";

    if ( bufferLang === "Japanese"
         || bufferLang === "JAPANESE"
         || bufferLang === "ja"
         || bufferLang === "Japanese (Japan)"
         || bufferLang === "JA"
         || bufferLang === "ja-JP" ) {
      lang = "ja";
    } else {
      lang = "en";
    }
    return lang;
  }

  generateTitle() {
    return (
      <i className='glyphicon glyphicon-globe'> { this.getLanguage() }</i>
    );
  }

  componentDidMount() {
    this.setLocaleLanguage( this.getLanguage() );
  }

  render() {
    return (
      <div>
        <DropdownButton bsStyle="primary" title={this.generateTitle()} noCaret id='language-selector'>
          <MenuItem id="lang-ja" onClick={() => this.setLocaleLanguage("ja")}>ja</MenuItem>
          <MenuItem id="lang-en" onClick={() => this.setLocaleLanguage("en")}>en</MenuItem>
        </DropdownButton>
      </div>
    );
  }
}
