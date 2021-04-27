import React from 'react';
import ToastContainer from '@ant-design/react-native/lib/toast/ToastContainer';

/**
 * View
 * @returns {*}
 */
var view = function () {
  const { visible } = this.state;
  return visible ? <ToastContainer {...this.state} /> : null;
};
module.exports = view;
