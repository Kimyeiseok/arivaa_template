import React from 'react';
import {
  NavigationEvents,
  withNavigation as withNavigationOld,
} from 'react-navigation';

/**
 * Set withNavigationHOC to use React Navigation 5 withNavigationHOC
 */
export function withNavigation() {
  return (props) => {
    let Component;
    let navigation;
    const withNavigationHOC =
      global.arivaa &&
      global.arivaa.reactNavigation &&
      global.arivaa.reactNavigation.withNavigationHOC;
    if (withNavigationHOC) {
      if (!(withNavigationHOC instanceof Function)) {
        throw 'withNavigationHOC should be a function';
      }
      Component = withNavigationHOC.apply(this, arguments);
    } else {
      Component = withNavigationOld.apply(this, arguments);
    }
    return <Component {...props} {...(navigation ? { navigation } : {})} />;
  };
}

export function getNavigationEvents() {
  const getNavigationEvents =
    global.arivaa &&
    global.arivaa.reactNavigation &&
    global.arivaa.reactNavigation.getNavigationEvents;
  if (getNavigationEvents) {
    if (!(getNavigationEvents instanceof Function)) {
      throw 'withNavigationHOC should be a function';
    }
    return getNavigationEvents();
  } else {
    return NavigationEvents;
  }
}
