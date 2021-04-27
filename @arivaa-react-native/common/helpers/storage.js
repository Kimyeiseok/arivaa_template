import AsyncStorage from '@react-native-community/async-storage';

export async function save(config) {
  let key = config.key;
  let value = config.value;
  return AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function load(config) {
  let obj = {
    key: config.key,
  };
  if (config.id) {
    obj.id = config.id;
  }
  const value = await AsyncStorage.getItem(obj.key);
  return value ? JSON.parse(value) : null;
}

export async function remove(key) {
  await AsyncStorage.removeItem(key);
}
