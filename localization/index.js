import * as translation from './translations';
const languages = [
  { name: 'English', code: 'en' },
  { name: 'French', code: 'fr' },
];
export default function ({ initialize }) {
  let translations = {};
  Object.values(translation).forEach((tl) => {
    translations = {
      ...translations,
      ...tl,
    };
  });
  initialize({
    languages,
    translation: translations,
    options: {
      renderToStaticMarkup: false,
      defaultLanguage: languages[0].code,
    },
  });
}
