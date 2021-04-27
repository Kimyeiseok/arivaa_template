import { Toast } from '@arivaa-react-native/common/components';
let toast = null;
/**
 * Start Spinning
 * Config Format -
 * content -> Content for spinner
 * duration -> Duration
 * onClose -> On close handler
 * mask -> Whether to show Mask or not
 * @param config
 */
function start(config) {
  if (toast) {
    stop();
  }
  config = config || {};
  let content = 'Loading...' || config.content;
  let mask = config.mask || true;
  let { duration, onClose } = config;
  duration = duration || 100000;
  toast = (config.toast || Toast).loading(content, duration, onClose, mask);
}
/**
 * Stop Spinning
 */
function stop() {
  toast !== undefined && Toast.destroy(toast);
  toast = null;
}

export default {
  start,
  stop,
};
