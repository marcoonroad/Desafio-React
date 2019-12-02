import * as StoreBuilder from './builder';
import * as UsersThunks from './users/thunks';

export type AppState = StoreBuilder.AppState;
export const AppStore = StoreBuilder.AppStore;
export const Thunks = {Users: UsersThunks};
