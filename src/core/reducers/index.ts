// Import the reducer combiner from redux
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { apolloReducer } from 'apollo-cache-redux';

// Import all of the separate reducers below
import { auth } from './auth';
import { drawer } from './drawer';

const reducers = {
  auth,
  drawer
};
// Export the combined reducers
export const rootReducer = combineReducers({
  ...reducers,
  apollo: apolloReducer,
  router: routerReducer
});
