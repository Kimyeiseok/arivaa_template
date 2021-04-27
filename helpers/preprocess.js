/**
 * Pre process a container with redux wrappers
 */
import { connect } from 'react-redux';
import { withLocalize } from 'react-localize-redux';
export default function preProcess(container, pluginsConfiguration) {
  if (pluginsConfiguration.localize) {
    container = withLocalize(container);
  }
  if (pluginsConfiguration.connect) {
    container = connect.apply(this, pluginsConfiguration.connect)(container);
  }
  return container;
}
