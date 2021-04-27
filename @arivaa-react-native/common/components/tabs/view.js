import React from 'react';
import { View, Dimensions } from 'react-native';
import { Colors } from '../../styles';
import { getModifiedProps } from '../util';
import { TabView, TabBar } from 'react-native-tab-view';
var view = function () {
  const { tabs, theme, index: propIndex, onIndexChange } = this.props;
  const { index } = this.state;
  const propStyles = this.props.styles || {};
  const { width } = Dimensions.get('window');
  return (
    <TabView
      ref={(ref) => {
        this.tabRef = ref;
      }}
      style={{
        backgroundColor: '#fff',
      }}
      navigationState={{
        index: propIndex !== undefined ? propIndex : index,
        routes: tabs.map((tab, index) => {
          return {
            key: index,
            title: tab.title,
          };
        }),
      }}
      renderTabBar={(props) => {
        return (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: theme || Colors.primaryColor }}
            labelStyle={{ color: theme || Colors.primaryColor }}
            style={{ backgroundColor: '#f2f2f7', elevation: 0 }}
            {...getModifiedProps(this.props, ['theme'])}
          />
        );
      }}
      renderScene={({ route }) => {
        return (
          <View style={[propStyles.tabContainer]}>
            {tabs[route.key].content}
          </View>
        );
      }}
      onIndexChange={
        propIndex === undefined
          ? (index) => this.setState({ index })
          : onIndexChange
      }
      initialLayout={{ width }}
    />
  );
};
module.exports = view;
