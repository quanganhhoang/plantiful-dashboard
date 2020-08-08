import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import orderReducer from './order/order.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['']
};

const rootReducer = combineReducers({
    user: userReducer,
    order: orderReducer,
});

export default persistReducer(persistConfig, rootReducer);
