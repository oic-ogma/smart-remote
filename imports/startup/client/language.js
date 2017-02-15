import i18n from 'meteor/universe:i18n';

export const getLanguage = () => {
  const bufferLang = i18n.getLanguageName();
  let lang = '';
  if (bufferLang === 'Japanese'
        || bufferLang === 'JAPANESE'
        || bufferLang === 'ja'
        || bufferLang === 'Japanese (Japan)'
        || bufferLang === 'JA'
        || bufferLang === 'ja-JP') {
    lang = 'ja';
  } else {
    lang = 'en';
  }
  return lang;
};
