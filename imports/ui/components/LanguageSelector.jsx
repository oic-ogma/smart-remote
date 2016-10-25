import React from 'react';
import i18n from 'meteor/universe:i18n';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class LanguageSelector extends React.Component {
  setLocaleLanguage(eventKey) {
    if ( eventKey === "ja" ) {
      i18n.setLocale( "ja" );
    } else {
      i18n.setLocale( "en" );
    }
  }

  getLanguage() {
    const BUFFER_LANG = i18n.getLanguageName();
    let lang = "";

    if ( BUFFER_LANG === "Japanese"
         || BUFFER_LANG === "JAPANESE"
         || BUFFER_LANG === "ja"
         || BUFFER_LANG === "Japanese (Japan)"
         || BUFFER_LANG === "JA"
         || BUFFER_LANG === "ja-JP" ) {
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
        <DropdownButton bsStyle="primary" title={this.generateTitle()} noCaret id='dropdown-basic'>
          <MenuItem eventKey=""  onClick={() => this.setLocaleLanguage("ja")}>ja</MenuItem>
          <MenuItem eventKey=""  onClick={() => this.setLocaleLanguage("en")}>en</MenuItem>
        </DropdownButton>
      </div>
    );
  }
}
