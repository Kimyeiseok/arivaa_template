import React from 'react';
const defaultIconSet = 'ionicons';

/**
 * View
 * @returns {XML}
 */
/**
 * View
 * @returns {XML}
 */
var view = function () {
  let { type } = this.props;
  const { iconMap } = this;
  type = (type || defaultIconSet).toLowerCase();
  if (!iconMap[type]) {
    throw new Error('Icon Set - ' + type + ' not supported');
  }
  let Icon = iconMap[type];
  return (
    <Icon
      ref={(ref) => {
        this.iconRef = ref;
      }}
      {...this.props}
    />
  );
};
module.exports = view;
