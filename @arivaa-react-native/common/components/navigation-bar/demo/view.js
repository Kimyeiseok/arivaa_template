import React from 'react';
import styles from './styles';
import { View, Text } from 'react-native';
import NavigationBar from '../main';

/**
 * View
 * @returns {XML}
 */
var view = function () {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.description]}>
        Navigation bars are usually for showcasing menu items which navigate to
        different screens in the application. We provide Menu and List types of
        navigation bars. These are completely navigation aware.
      </Text>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>
          Simple Menu Navigation Bar without Links
        </Text>
        <NavigationBar
          type="menu"
          leftMenu={['ios-menu']}
          rightMenu={['ios-home', 'ios-notifications', 'ios-basket']}
          title="Arivaa"
        />
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>
          Simple Menu Navigation Bar with Links
        </Text>
        <NavigationBar
          type="menu"
          leftMenu={[
            {
              icon: 'ios-menu',
              link: 'ToggleDrawer',
            },
          ]}
          rightMenu={[
            {
              icon: 'ios-home',
              content: 'Current',
              link: 'elementView',
            },
            {
              icon: 'ios-notifications',
              content: 'Elements',
              link: 'elements',
            },
            {
              icon: 'user',
              content: 'Profile',
              link: 'profile',
            },
          ]}
          title="Arivaa"
        />
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>
          Simple List Navigation Bar without Links
        </Text>
        <NavigationBar
          type="list"
          menu={['Home', 'Profile', 'Orders', 'Logout']}
          title="Arivaa"
        />
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>
          Simple List Navigation Bar with Actions
        </Text>
        <NavigationBar
          type="list"
          menu={[
            {
              icon: 'ios-home',
              content: 'Current',
              action: () => {
                alert('Arivaa is awesome!');
              },
            },
            {
              icon: 'ios-notifications',
              content: 'Elements',
              action: () => {
                alert('Arivaa is awesome!');
              },
            },
            {
              icon: 'ios-contact',
              content: 'Profile',
              action: () => {
                alert('Arivaa is awesome!');
              },
            },
          ]}
          title="Arivaa"
        />
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title, styles.margin]}>
          List Navigation Bar with Text, Icons and Links.
        </Text>
        <Text style={[styles.message]}>
          ( Current is highlighted since its the active screen. Try Clicking on
          any icon. )
        </Text>
        <NavigationBar
          type="list"
          menu={[
            {
              icon: 'ios-home',
              content: 'Current',
              link: 'elementView',
            },
            {
              icon: 'ios-notifications',
              content: 'Elements',
              link: 'elements',
            },
            {
              icon: 'ios-contact',
              content: 'Profile',
              link: 'profile',
            },
          ]}
          title="Arivaa"
        />
      </View>
    </View>
  );
};
module.exports = view;
