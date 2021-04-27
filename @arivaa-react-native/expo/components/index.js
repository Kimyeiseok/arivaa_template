import './dependencies';
import * as Font from 'expo-font';
export { default as Demo } from './demo';
export async function configureExpoComponents() {
  try {
    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );

    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
  } catch (e) {
    console.warn('Error while configuring expo components ', { e });
  }
}
