import { Toast, Portal } from '@ant-design/react-native';

let newToast = {
  ...Toast,
  destroy: (key) => {
    return Portal.remove(key);
  },
};
export const fnsToBeModified = [
  'info',
  'success',
  'offline',
  'loading',
  'fail',
  'show',
  'hide',
];
for (let key in newToast) {
  if (fnsToBeModified.indexOf(key) != -1) {
    const duration = key == 'loading' ? 60 * 1000 : 1;
    newToast[key] = function () {
      let newArguments = [...arguments];
      if (newArguments.length == 0) {
        newArguments = ['', duration];
      } else if (newArguments.length == 1) {
        newArguments.push(duration);
      } else {
        if (typeof newArguments[1] !== 'number') {
          newArguments[1] = duration;
        }
      }

      return Toast[key].apply(this, newArguments);
    };
  }
}

export default newToast;
