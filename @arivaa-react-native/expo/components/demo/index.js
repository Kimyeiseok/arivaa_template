import DataDisplay from './dataDisplay';
import DataInput from './dataInput';
import Feedback from './feedback';
import Navigation from './navigation';
import { Demo } from '@arivaa-react-native/common';
export default [
  {
    name: 'Data Display',
    components: [...Demo[0].components, ...DataDisplay],
  },
  {
    name: 'Data Input',
    components: [...Demo[1].components, ...DataInput],
  },

  {
    name: 'Feedback',
    components: [...Demo[2].components, ...Feedback],
  },
  {
    name: 'Navigation',
    components: [...Demo[3].components, ...Navigation],
  },
];
