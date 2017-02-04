import React from 'react';
import i18n from 'meteor/universe:i18n';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class LanguageSelector extends TrackerReact(React.Component) {
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
    let style = {
      languageStyle: {
        color: "#fff",
      },
      iconStyle: {
        marginRight: "3px",
      },
    };
    return (
      <div style={style.languageStyle}>
        <i className='glyphicon glyphicon-globe' style={style.iconStyle}/>
        { this.getLanguage() }
      </div>
    );
  }

  componentDidMount() {
    this.setLocaleLanguage( this.getLanguage() );
  }

  render() {
    let style = {
      buttonStyle: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderStyle: "none",
      },
    };

    if (!Meteor.user()) {
      return (
        <div>
          <DropdownButton
            title={this.generateTitle()}
            noCaret
            id='language-selector'
            style={style.buttonStyle}
            >
            <MenuItem id="lang-ja" onClick={() => this.setLocaleLanguage("ja")}>ja</MenuItem>
            <MenuItem id="lang-en" onClick={() => this.setLocaleLanguage("en")}>en</MenuItem>
          </DropdownButton>
        </div>
      );
    } else {
      return false;
    }
  }
}
