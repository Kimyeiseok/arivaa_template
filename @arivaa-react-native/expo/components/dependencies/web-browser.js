import * as WebBrowser from 'expo-web-browser';
export default {
  openLink: function (link, options) {
    return WebBrowser.openBrowserAsync(link, options);
  },
};
