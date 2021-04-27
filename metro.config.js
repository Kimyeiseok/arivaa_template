/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const fs = require('fs');

/**
 * Logic to watch directories having wildcard imports
 * TODO : Find these directories automatically and put this logic in a plugin
 */
const wildCardDirectoryMap = {
  'localization/translations': 'localization/index.js',
  'redux/reducers': 'redux/index.js',
  'demos/components': 'demos/index.js',
};
Object.keys(wildCardDirectoryMap).map((key) => {
  try {
    if (fs.existsSync(key)) {
      fs.watch(
        key,
        {
          //recursive: true,
        },
        function (eventType) {
          try {
            if (eventType === 'rename') {
              //Todo - Remove this new line also
              fs.appendFile(wildCardDirectoryMap[key], '\n', {}, () => {});
            }
          } catch (e) {
            console.debug('Error while writing for wildcard directories', {
              e,
            });
          }
        }
      );
    }
  } catch (e) {
    console.debug('Error while watching wildcard directories', { e });
  }
});
module.exports = {};
