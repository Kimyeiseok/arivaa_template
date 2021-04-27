import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { AnimatedCircularProgress as Progress } from 'react-native-circular-progress';
import { getModifiedProps } from '../util';
import { Colors } from '../../styles';
import { getReactNode } from '../util';

const supportedProgressTypes = ['bar', 'circle', 'pie'];
/**
 * View
 * @returns {XML}
 */
var view = function () {
  let {
    type,
    size,
    thickness,
    tintColor,
    backgroundColor,
    progress,
    maxProgress,
    showsText,
    children,
  } = this.props;
  let propStyles = this.props.styles || {};
  type = (type || '').toLowerCase();
  if (supportedProgressTypes.indexOf(type) == -1) {
    type = 'circle';
  }
  //alert();
  const defaultProps = {
    size: size || 100,
    width: thickness || 5,
    tintColor: tintColor || Colors.primaryColor,
    backgroundColor: backgroundColor || '#e6e6e6',
    fill: progress || 0,
    style: propStyles,

    // unfilledColor: '#e6e6e6',
    // animated: true,
    // indeterminate: typeof this.props.progress == 'undefined' || !this.props.progress
  };
  const componentProps = getModifiedProps(this.props, [
    'type',
    'theme',
    'maxProgress',
    'styles',
  ]);
  const finalProps = {
    ...defaultProps,
    ...componentProps,
    progress: this.getProgress(),
  };

  switch (type) {
    case 'bar':
      if (showsText) {
        return (
          <View style={[styles.barWithText, propStyles.barContainer]}>
            <Progress.Bar {...finalProps} children={null} showsText={false} />
            {showsText
              ? getReactNode(
                  children ||
                    (Math.round(this.getProgress() * 100) * 100) / 100 + ' %',
                  {
                    style: [styles.barText, propStyles.barText],
                  }
                )
              : null}
          </View>
        );
      } else {
        return <Progress.Bar {...finalProps} />;
      }
    case 'circle':
      return (
        <View>
          <Progress {...defaultProps} />
          {showsText
            ? getReactNode(
                children ||
                  (Math.round(this.getProgress() * 100) * 100) / 100 + ' %',
                {
                  style: [
                    styles.circularProgressText,
                    propStyles.circularProgressText,
                  ],
                }
              )
            : null}
        </View>
      );
    case 'pie':
      return <Progress.Pie {...finalProps} />;
  }
};
module.exports = view;
