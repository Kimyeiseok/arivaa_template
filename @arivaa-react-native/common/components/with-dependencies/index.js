import React, { Component } from 'react';

let dependencyMap = {};

/**
 * Configure dependencies
 * @param dependencies
 */
export function configureDependencies(dependencies) {
  dependencies = dependencies || {};
  Object.keys(dependencies).map((key) => {
    configureDependency(key, dependencies[key]);
  });
}
/**
 * Configure a dependency
 * @param name
 * @param dependency
 */
export function configureDependency(name, dependency) {
  if (typeof name !== 'string' || name == '') {
    throw new Error(
      'Name of type String is mandatory for configuring a dependency'
    );
  }
  if (!(dependency instanceof Function || dependency instanceof Object)) {
    throw new Error(
      'A Valid Dependency React Component is mandatory for configuring a dependency'
    );
  }
  name = name.toLowerCase();
  dependencyMap[name] = dependency;
}

/**
 * Resolve a dependency
 * @param name
 * @returns {*}
 */
export function getDependency(name) {
  name = (name || '').toLowerCase();
  return dependencyMap[name];
}

/**
 * HOC for Dependency resolution b/w normal RN and expo
 * @param Component
 * @returns {Main}
 */
export default function (WrappedComponent, displayName) {
  /**
   * @description Link
   * @type Component
   * @author Inderdeep
   */
  class Main extends Component {
    /**
     * Container
     * @param props
     */
    constructor(props) {
      super(props);
      this.wrappedComponent = React.createRef();
    }

    /**
     * ComponentDidMount Hook
     */
    componentDidMount() {
      /**
       * Copy ref functions
       */
      for (let key in this.wrappedComponent) {
        if (this.wrappedComponent[key] instanceof Function) {
          this[key] = this.wrappedComponent[key];
        }
      }
    }

    /**
     * Render Method
     * @returns {*}
     */
    render() {
      const { props } = this;
      return (
        <WrappedComponent
          ref={(ref) => {
            this.wrappedComponent = ref;
          }}
          {...props}
          getDependency={getDependency.bind(this)}
        />
      );
    }
  }
  if (displayName) {
    Main.displayName = displayName;
  }
  return Main;
}
