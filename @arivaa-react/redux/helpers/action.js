import axios from 'axios';
let makeRequest = axios.create();
let actions = {};

/**
 * Configure Actions
 */
export function configureActions(actionsArr) {
  if (!(actionsArr instanceof Array)) {
    throw 'Actions should be a array in configureActions';
  }
  actionsArr.forEach((action) => {
    if (!action || !action.name) {
      throw 'Action should be defined and have a name';
    }
    actions[action.name] = action;
  });
}

/**
 *
 * @param name
 * @param data
 * @param params
 * @returns {{}}
 */
export function createAction(name, data) {
  /**
   * Validate if its configured correctly
   */
  const config = validateAndGetActionConfig(name);
  /**
   * if type not present - Take it as normal
   */
  switch ((config.type || 'normal').toLowerCase()) {
    case 'ajax':
      return createAjaxAction(config, data);
    default:
      return createNormalAction(config, data);
  }
}

/**
 * Validate and get Action configuration
 * @param name
 * @returns {*}
 */
function validateAndGetActionConfig(name) {
  if (name === '' || !actions[name]) {
    throw new Error('Action name is not present in supported actions');
  }
  const config = actions[name];
  if (!config) {
    throw new Error('Action Configuration is not present in supported actions');
  }
  return config;
}
/**
 * Creates a ajax based action
 * @param config
 * @param data
 * @returns {{}}
 */
function createAjaxAction(actionConfig, data) {
  let { config, name } = actionConfig;
  config = config || {};
  let { url, method, headers, getUrl } = config;
  if (getUrl) {
    url = getUrl(data);
  }
  let params = {};
  // /**
  //  * Custom provided data always overrides the configuration
  //  * - Input data is passed as an argument in case
  //  * we wants to create params and data from input data
  //  */
  // if(!data && typeof config.getData != 'undefined'){
  //   data = config.getData(data);
  // }
  if (!method) {
    throw new Error('Request Method should be provided for ajax actions');
  }
  /**
   * In case of get method, Params = data and data becomes undefined
   */
  if (method.toUpperCase() === 'GET') {
    params = data;
    /**
     * Create Params from getParams method in case of other request methods
     */
    if (config.getParams) {
      params = config.getParams(data);
    }
    data = undefined;
  } else {
    /**
     * Create Params from getParams method in case of other request methods
     */
    if (config.getParams) {
      params = config.getParams(data);
    }
  }
  /**
   * Custom provided data always overrides the configuration
   * - Input data is passed as an argument in case
   * we wants to create params and data from input data
   */
  if (typeof config.getData !== 'undefined') {
    data = config.getData(data);
  }
  /**
   * Create request config and make the request
   */
  let requestConfig;

  requestConfig = {
    url,
    method: (method || 'get').toLowerCase(),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    data,
    params,
  };
  const request = makeRequest(requestConfig);
  let action = {};
  action.type = name;
  action.payload = request;
  return action;
}
/**
 * Create a normal action
 * @param config
 * @param data
 * @returns {{}}
 */
function createNormalAction(actionConfig, data) {
  let { config, name } = actionConfig;
  config = config || {};
  /**
   * Custom provided data always overrides the configuration
   */
  if (!data && typeof config.getData !== 'undefined') {
    data = config.getData();
  }
  let action = {};
  action.type = name;
  /**
   * If Dummy promise is enabled or not
   */
  if (config.promise) {
    action.payload = Promise.resolve(data || null);
  } else {
    action.payload = data;
  }
  ////console.log(action)
  return action;
}

export function getAxiosInstance() {
  return makeRequest;
}

export function setAxiosInstance(instance) {
  instance && (makeRequest = instance);
}
