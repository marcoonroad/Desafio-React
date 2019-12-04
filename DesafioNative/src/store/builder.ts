import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import usersReducer from './users/reducers';

const rootReducer = combineReducers({
  users: usersReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const AppStore = () => {
  const middlewares = [thunkMiddleware];
  const enhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, enhancer);

  return store;
};
