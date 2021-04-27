import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import elements from '../screens/demo';
import { ElementView, ModalUtils } from '@arivaa-react-native/common';
import Sample from '../screens/sample';
import HeaderWithMenu from '../components/headerWithMenu';
import Login from '../screens/login';
import SignUp from '../screens/signUp';
import ForgotPassword from '../screens/forgotPassword';
import ResetPassword from '../screens/resetPassword';
import ChangePassword from '../screens/change-password';
import Analytics from '../screens/analytics';
import Admob from '../screens/admob';
import PushNotifications from '../screens/push-notifications';
import Map from '../screens/map';
import Verification from '../screens/verification';
import Splash from '../screens/splash';
import Home from '../screens/home';
import Profile from '../screens/profile';
import EditProfile from '../screens/editProfile';
import FacebookAds from '../screens/facebookAds';
import Drawer from '../components/drawer';
export const INITIAL_ROUTE = 'unsecured';
export const INITIAL_SECURED_ROUTE = 'home';
export const INITIAL_UNSECURED_ROUTE = 'splash';

const securedRoutes = {
  home: {
    screen: Home,
    header: false,
  },
  profile: {
    screen: Profile,
    header: false,
  },
  editProfile: {
    screen: EditProfile,
    header: false,
  },
  changePassword: {
    screen: ChangePassword,
    header: false,
  },
  admob: {
    screen: Admob,
    header: false,
  },
  analytics: {
    screen: Analytics,
    header: false,
  },
  pushNotifications: {
    screen: PushNotifications,
    header: false,
  },
  map: {
    screen: Map,
    header: false,
  },
  facebookAds: {
    screen: FacebookAds,
    header: false,
  },
  elements: {
    screen: elements,
    header: false,
  },
  elementView: {
    screen: ElementView,
    header: false,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
};
const unsecuredRoutes = {
  sample: {
    screen: Sample,
  },
  login: {
    screen: Login,
  },
  signUp: {
    screen: SignUp,
  },
  forgotPassword: {
    screen: ForgotPassword,
  },
  resetPassword: {
    screen: ResetPassword,
  },
  verification: {
    screen: Verification,
  },
  splash: {
    screen: Splash,
  },
  elements: {
    screen: elements,
    header: false,
  },
  elementView: {
    screen: ElementView,
    header: false,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
};

const Routes = {
  unsecured: {
    screen: createStackNavigator(unsecuredRoutes, {
      initialRouteName: INITIAL_UNSECURED_ROUTE,
      headerMode: 'none',
    }),
  },
  secured: {
    screen: createDrawerNavigator(
      {
        /**
         * Had to create another nested navigator due to back button
         * issue which always redirected to home page
         * https://stackoverflow.com/questions/56755054/how-to-go-back-by-backbutton-in-stack-navigator-that-is-inside-drawer-navigator
         */
        drawer: createStackNavigator(securedRoutes, {
          initialRouteName: INITIAL_SECURED_ROUTE,
          headerMode: 'none',
        }),
      },
      {
        /**
         * There is a reason why we had to put secured routes in a Stack Navigator
         * nested inside the stack navigator, We dont want to show header in
         * Drawer and there is no way to hide header in case of draweropen and
         * show in case of normal route. So we have put all the routes under
         * a stack navigator where the header will be shown and in drawer
         * it is set to null
         */
        initialRouteName: 'drawer',
        navigationOptions: (props) => {
          let navigationOptions = {};
          const { navigation } = props;
          const routeName = navigation.state.routeName;
          navigationOptions.header = (
            <HeaderWithMenu
              hide={securedRoutes[routeName] && securedRoutes[routeName].header}
              navigation={navigation}
            />
          );
          return navigationOptions;
        },
        drawerBackgroundColor: 'transparent',
        contentComponent: Drawer,
        /**
         * Fix for https://github.com/react-navigation/react-navigation/issues/3148
         */
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
      }
    ),
  },
};
const mainNavigator = createStackNavigator(Routes, {
  initialRouteName: INITIAL_ROUTE,
  headerMode: 'none',
});
//Modal Maps for invoking via Modal Triggers
const Modals = {
  verification: Verification,
  login: Login,
  signUp: SignUp,
};
setTimeout(() => {
  ModalUtils.setModalScenes(Modals);
});
export default createAppContainer(mainNavigator);
