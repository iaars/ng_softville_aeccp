import {firebase} from './firebase.environment';

export const environment = {
  firebaseConfig: {
    ...firebase.config
  },
  production: true
};
