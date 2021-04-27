import React from 'react';
import Select from '../../../select';
import Colors from '../../../../styles/color';

/**
 * View
 * @returns {XML}
 */
var view = function () {
  const { value } = this.state;
  const { propStyles } = this.props;
  return (
    <Select
      type="modal"
      title="Select Country"
      searchPlaceholderText={'Search Countries'}
      search={true}
      multiple={false}
      {...this.props}
      data={this.getCountryCodeMap()}
      value={value}
      onChange={this.onChange.bind(this)}
      selectInputIcon={'map-pin'}
      styles={{
        ...propStyles,
      }}
    />
  );
};
module.exports = view;
